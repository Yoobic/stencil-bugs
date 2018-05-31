import { Injectable } from '@angular/core';
import { Broker, ResponseObject, Session, User, Users } from '@shared/data-core';
import { Filter } from '@shared/interfaces';

import { Channel as ChannelInterface } from '../../interfaces/channel/channel.interface';
import { Channels } from '../../interfaces/channels/channels.interface';
import { Pubnub } from '../pubnub/pubnub.service';

import { Observable, Observer, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { uniqBy, orderBy } from 'lodash-es';
import { Translate } from '@shared/translate';

export { ChannelInterface };

@Injectable()
export class Channel {

    constructor(private broker: Broker, private pubnub: Pubnub, private session: Session, protected translate: Translate) { }

    getChannelsById(id: string) {
        return this.broker.getById('channels', id).pipe(map(channel => {
            this.hydrateOthers(channel, true);
            return channel;
        }));
    }

    getChannelById(channelId: string) {
        return this.broker.getAll('channel', null, null, null, [
            [{ field: 'channel', operator: { _id: 'eq' }, value: channelId }]
        ]).pipe(map(retVal => {
            if (retVal && retVal.data && retVal.data.length > 0) {
                let channel = retVal.data[0];
                this.hydrateOthers(channel, false);
                return channel;
            }
            return null;
        }));
    }

    //update the channel itself when we publish a new message
    update(channel: ChannelInterface) {
        channel = Object.assign({}, channel);
        delete channel.others;
        return this.broker.upsert('channel', channel).pipe(mergeMap(c => this.broker.getById('channel', c._id)));
    }

    //Get the channel filter for a specific user
    getFilter(user1: User, user2?: User, isSupport?: boolean): Filter {
        let usersRef = [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user1._id }] }];
        if (user2) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user2._id }] });
        }
        if (!isSupport) {
            usersRef.push({ field: 'usersRef', operator: { _id: 'nin' }, value: Users.adminIds });
        }
        return [
            ...usersRef,
            { field: 'channel', operator: { _id: 'like' }, value: '_' },
            { field: 'isSupport', operator: { _id: 'eq' }, value: isSupport === true }
        ];
    }

    getChannelsFilter(user: User): Filter {
        return [{ field: 'usersRef', operator: { _id: 'inq' }, value: [{ _id: user._id }] }];
    }

    hydrateOthers(channel: ChannelInterface | Channels, isGroup = false): ChannelInterface | Channels {
        if (channel && channel.users) {
            channel.others = channel.users.filter(u => u._id !== this.session.userId);
        }
        if (isGroup && (!channel.channel || !channel.channel.startsWith('group_'))) {
            channel.channel = 'group_' + channel._id;
        }
        return channel;
    }

    //return the channel beetween 2 users
    getByUsers(user1: User, user2?: User, isSupport?: boolean) {
        return new Observable<ChannelInterface>((observer: Observer<ChannelInterface>) => {
            this.broker.getAll('channel', null, null, null, [this.getFilter(user1, user2, isSupport)]).subscribe(retVal => {
                let channel;
                if (retVal.data.length > 0) {
                    channel = retVal.data[0];
                    this.hydrateOthers(channel);
                    observer.next(channel);
                    observer.complete();
                } else {
                    channel = {
                        usersRef: isSupport ? [this.pubnub.supportId, user1._id] : [user1._id, user2._id],
                        channel: isSupport ? this.pubnub.getSupportChannelId(user1._id) : this.pubnub.getChannelId(user1._id, user2._id),
                        isSupport: isSupport === true,
                        isFavorite: false,
                        users: isSupport ? [
                            { _id: this.pubnub.supportId, username: 'smartin@yoobic.com', firstName: 'Sarah', lastName: 'Martin', imageData: 'http://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1466421996/jv0vc0yizwqefj22iirh.png' },
                            user1
                        ] : [user1, user2]
                    };
                    this.broker.setAcl(channel, null, null, null, user2 ? [user1._id, user2._id] : [user1._id]);
                    this.update(<any>channel).subscribe((c) => {
                        this.hydrateOthers(c);
                        observer.next(c);
                        observer.complete();
                    });
                }
            });
        });
    }

    //Return the support channel for a specific user
    getSupportByUser(user: User): Observable<ChannelInterface> {
        return this.getByUsers(user, null, true);
    }

    getTransform(userId: string, isGroup = false) {
        return (res: ResponseObject) => {
            let channels = [];
            return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
                if (res.data && res.data.map) {
                    if (!isGroup) {
                        res.data = uniqBy(res.data, 'channel');
                    }
                    channels = res.data.map((channel: any) => {
                        this.hydrateOthers(channel, isGroup);
                        if (channel.others && channel.others.length > 0) {
                            if (!isGroup) {
                                channel.isOnline = this.pubnub.isOnline(channel.others[0]._id);
                            }
                            return channel;
                        } else {
                            return undefined;
                        }

                    }).filter(x => x !== undefined);
                }
                if (channels.length === 0) {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                } else {
                    forkJoin(channels.map((channel: ChannelInterface) => {
                        return this.pubnub.getHistory(channel.channel, 1).pipe(
                            map((retVal: any) => {
                                if (retVal.length > 0) {

                                    channel.lastMessage = null;
                                    channel.lastMessageAlternate = null;
                                    channel.lastMessageDate = '';

                                    let messages = retVal[0];
                                    if (messages.length > 0) {
                                        let lastMessage = messages[0];
                                        if (!channel.deleteMessages || channel.deleteMessages.indexOf(lastMessage.date_sent) < 0) {
                                            channel.lastMessage = lastMessage.message;
                                            channel.lastMessageDate = lastMessage.date_sent;
                                            if (channel.lastMessage && channel.lastMessage.indexOf('ionic-chat-image') > 0) {
                                                channel.lastMessage = this.translate.get('PHOTO');
                                            }
                                            channel.lastMessageAlternate = lastMessage.sender_id !== this.session.userId;
                                        }
                                    }
                                }
                                return channel;
                            }));
                    })).subscribe(c => {
                        c = orderBy(c, ['lastMessageDate'], ['desc']);
                        observer.next({ count: res.count, data: <any>c });
                        observer.complete();
                    });
                }
            });
        };
    }

    //Remove the current user from the users list and assign the others attribute
    getTransformChannel(userId: string) {
        return this.getTransform(userId, false);
    }

    //Remove the current user from the users list and assign the others attribute
    getTransformChannels(userId: string) {
        return this.getTransform(userId, true);
    }

}
