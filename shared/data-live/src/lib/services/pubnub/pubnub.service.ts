import { Injectable } from '@angular/core';
import { Log, ConfigConstants } from '@shared/common';
import { Translate } from '@shared/translate';
import { User, Authentication, Session, Push } from '@shared/data-core';

import { ChatMessage as Message } from '../../interfaces/message/message.interface';
import { Channels } from '../../interfaces/channels/channels.interface';
import { IPubNub, PresenceEvent, MessageEvent, StatusEvent, ChannelState, HereNowResponse, UUIDState, GlobalState } from '../../interfaces/pubnub/pubnub.interface';

import { includes, isObject, pick, forEach, each } from 'lodash-es';

import { Subscription, Observable, Subject, from, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

//declare const System: System;

import * as pubnubLib from 'pubnub/dist/web/pubnub';

export class PubnubSender {
    id: string;
    username: string;
    image: string;
    appTitle: string;

    constructor(id, username, image, appTitle = 'YOOBIC') {
        this.id = id;
        this.username = username;
        this.image = image;
        this.appTitle = appTitle;
    }
}

@Injectable()
export class Pubnub {
    //private static _pubnub: any = null;

    protected sender: PubnubSender;
    protected onlineUsers = new Map<string, any>();

    private _supportId = '53fb03c6546847ee0536386a';
    private _mainChannel = 'yoobicchannel';
    private _supportPrefix = 'support_';
    private _groupPrefix = 'group_';
    private _channels: {
        [channel: string]: {
            messages: Subject<Message>,
            subscription: Subscription,
            typing?: Subject<[string, boolean]>
        };
    } = {};
    private _presenceSubject = new Subject<PresenceEvent>();
    private _messageSubject = new Subject<MessageEvent>();
    private _statusSubject = new Subject<StatusEvent>();

    private _parentSubscription = new Subscription();

    private pubnub: IPubNub;

    constructor(private authentication: Authentication, private session: Session, private translate: Translate, private log: Log, private configConstants: ConfigConstants, protected push: Push) { }

    // getPubnub(): Promise<any> {
    //     if (Pubnub._pubnub) {
    //         return Promise.resolve(Pubnub._pubnub);
    //     }
    //     return import(/* webpackChunkName: "realtime" */'pubnub/dist/web/pubnub').then((retVal) => {
    //         Pubnub._pubnub = retVal.default;
    //         return Pubnub._pubnub;
    //     });
    // }

    get supportId() {
        return this._supportId;
    }

    changeState(channels: string[], state: ChannelState): Promise<ChannelState> {
        return this.pubnub.setState({ uuid: this.sender.id, channels, state }).then(r => r.state);
    }

    setIsTyping(channel: string, isTyping: boolean): Promise<ChannelState> {
        return this.changeState([channel], { isTyping: isTyping.toString() });
    }

    isOnline(userId: string): boolean {
        return this.onlineUsers.has(userId);
    }

    isPresent(userId: string, channel = this._mainChannel): Promise<boolean> {
        return this.pubnub.whereNow({ uuid: userId })
            .then((res) => {
                return includes(res.channels, channel);
            })
            .catch(err => {
                // if we get an error, don't reject, just return false;
                return false;
            });
    }

    getChannelId(user1Id: string, user2Id: string) {
        return user1Id < user2Id ? user1Id + '_' + user2Id : user2Id + '_' + user1Id;
    }

    getSupportChannelId(userId: string) {
        return this._supportPrefix + this.supportId + '_' + userId;
    }

    isSupportChannel(channel) {
        return channel.indexOf(this._supportPrefix) >= 0;
    }

    parseSupportChannel(channel) {
        return channel.replace(this._supportPrefix, '').replace(this._supportId + '_', '');
    }

    getGroupChannelId(channelId) {
        return this._groupPrefix + channelId;
    }

    isGroupChannel(channel) {
        return channel.indexOf(this._groupPrefix) === 0;
    }

    parseGroupChannel(channel) {
        return channel.replace(this._groupPrefix, '');
    }

    getHistory(channel: string, count = 10, start?: number): Observable<[Array<Message>, number, number]> {
        if (!this.pubnub) {
            return of(<any>[]);
        }
        return from(this.pubnub.history({ channel: channel, count: count, reverse: false, start: start }))
            .pipe(map(({ messages, startTimeToken, endTimeToken }): [Array<Message>, number, number] => {
                return [messages.map(item => item.entry), startTimeToken, endTimeToken];
            }));
    }

    getChannelTyping(channel: string): Subject<[string, boolean]> {
        if (channel && this._channels[channel] && this._channels[channel].typing) {
            return this._channels[channel].typing;
        } else {
            return null;
        }
    }

    initChannelTyping(channel: string, parent: Subscription): Subject<[string, boolean]> {
        let typing = new Subject<[string, boolean]>();
        let typingSubscription = this._presenceSubject.pipe(
            filter((m) => m.channel === channel && m.uuid !== this.sender.id),
            map(({ uuid, action, state }) => {
                switch (action) {
                    case 'leave':
                    case 'timeout':
                        return [uuid, false];
                    case 'join':
                    case 'state-change':
                        return [uuid, isObject(state) && state.isTyping === 'true'];
                }
            })
        ).subscribe(typing);
        parent.add(typing);
        parent.add(typingSubscription);
        return typing;
    }

    join(channel: string, withPresence = false, withTyping = false): Observable<Message> {
        if (!this._channels[channel] || this._channels[channel].subscription.closed) {
            let messages = new Subject<Message>();
            if (this._messageSubject) {
                let subscription = this._messageSubject.pipe(
                    filter(m => m.channel === channel),
                    map((m) => m.message)
                ).subscribe(messages);
                subscription.add(messages);
                let typing;
                if (withTyping) {
                    typing = this.initChannelTyping(channel, subscription);
                }
                this._parentSubscription.add(subscription);
                this._channels[channel] = { messages, subscription, typing };
            }
            if (this.pubnub) {
                this.pubnub.subscribe({ channels: [channel], withPresence: withPresence || withTyping });
            }
        }
        if (this._channels && this._channels[channel] && this._channels[channel].messages) {
            return this._channels[channel].messages;
        } else {
            return new Subject<Message>();
        }
    }

    leave(channel: string) {
        if (channel && this._channels[channel]) {
            this._channels[channel].subscription.unsubscribe();
            this.pubnub.unsubscribe({ channels: [channel] });
        }
    }

    publish(channel: string, message: Message) {
        this.pubnub.publish({ channel: channel, message: message });
    }

    sendChatMessage(channel: string, text: string, receiverId: string, receiverUsername: string, channels?: Channels, photo?: any, type = 'chat', options = {}) {
        let isGroup = this.isGroupChannel(channel);
        let alertText = ''; //this.sender.username;
        if (text.indexOf('ionic-chat-image') >= 0) {
            alertText += '' + this.translate.get('SENDANEWPHOTO'); //': '
        } else {
            alertText += '' + text.substr(0, 50) + '...';
        }
        let message: Message = {
            channel: channel,
            message: text,
            type: type,
            options: options,
            //entityId: entityId,
            sender_id: this.sender.id,
            sender_username: this.sender.username,
            receiver_id: receiverId,
            receiver_username: receiverUsername,
            isGroup: isGroup,
            groupName: !isGroup ? null : channels.name,
            date_sent: new Date(),
            photo: photo ? <any>pick(photo, ['_id', 'value', 'edit', 'texts', 'title', 'name', 'missiondescriptionRef', 'missionRef', 'missiondataRef', 'userRef', 'userDisplayname', 'address']) : null
        };
        // let offlineMessage = Object.assign({}, message, {
        //     pn_apns: { aps: { alert: alertText, badge: 1 }, sender_username: this.sender.username, channel: channel }, //type: type || chatEvent.newMessage,
        //     pn_gcm: { data: { message: alertText, title: 'Yoobic', sender_username: this.sender.username, channel: channel } }, //type: type || chatEvent.newMessage,
        //     pn_debug: false
        // });

        let otherIds = [];
        if (!isGroup) {
            otherIds = [receiverId];
        } else {
            otherIds = channels.others.map(u => u._id);
        }

        otherIds.forEach(otherId => {
            let promise = !this.isOnline(otherId) ? Promise.resolve(false) : this.isPresent(otherId, channel);
            promise.then((present) => {
                if (!present) {
                    //this.publish(otherId, offlineMessage);
                    this.push.notifyUserById(otherId, {
                        title: (isGroup ? channels.name + ' - ' : '') + this.sender.username,
                        body: alertText,
                        mode: 'notification',
                        pendingBadgePath: 'pendingBadges.communicate',
                        data: message
                    }).subscribe(() => { });
                }
            }, (err) => { });
        });

        //} else {
        // forEach(mentions, function(user) {
        //     if (user._id !== sender.senderId && !pubnubHelper.isPresent(channel, user._id)) {
        //         offlineMessage.receiver_id = user._id;
        //         this.publish(user._id, offlineMessage);
        //     }
        // });
        //}
        this.publish(channel, message);
    }

    safeMultiplexMessageObservable(channels: string[]): Observable<Message> {
        return new Observable<Message>(observer => {
            // this._channels[this._mainChannel].messages.subscribe(m => observer.next(m));
            // this._channels[this.sender.id].messages.subscribe(m => observer.next(m));
            // if (!this.authentication.isAdmin()) {
            //     this.session.groups.forEach(group => {
            //         this._channels[group].messages.subscribe(m => observer.next(m));
            //     });
            // }
            forEach(channels, (channel: string) => {
                this._parentSubscription.add(this._channels[channel].messages.subscribe(m => observer.next(m)));
            });
        });
    }

    init(user: User): Observable<Message> {
        //return from(this.getPubnub()).pipe(mergeMap(pubnub => {

        this._presenceSubject = !this._presenceSubject || this._presenceSubject.closed ? new Subject<PresenceEvent>() : this._presenceSubject;
        this._messageSubject = !this._messageSubject || this._messageSubject.closed ? new Subject<MessageEvent>() : this._messageSubject;
        this._statusSubject = !this._statusSubject || this._statusSubject.closed ? new Subject<StatusEvent>() : this._statusSubject;
        this._parentSubscription = !this._parentSubscription || this._parentSubscription.closed ? new Subscription() : this._parentSubscription;

        this.sender = new PubnubSender(user._id, User.getDisplayName(user), user.imageData);
        this.pubnub = new pubnubLib({
            ssl: true,
            keepAlive: true,
            announceFailedHeartbeats: false,
            heartbeatInterval: 600,
            presenceTimeout: 300,
            // setPresenceTimeout: 0,
            // setPresenceTimeoutWithCustomInterval: 0,
            publishKey: this.configConstants.pubnubPublishKey,
            subscribeKey: this.configConstants.pubnubSubscribeKey,
            uuid: this.sender.id
        });

        this._parentSubscription.add(this._presenceSubject);
        this._parentSubscription.add(this._messageSubject);
        this._parentSubscription.add(this._statusSubject);
        // connect listener to subjects
        this.pubnub.addListener({
            presence: (p: PresenceEvent) => {
                if (this._presenceSubject && this._presenceSubject.next) {
                    this._presenceSubject.next(p);
                }
            },
            message: (m: MessageEvent) => {
                if (this._messageSubject && this._messageSubject.next) {
                    this._messageSubject.next(m);
                }
            },
            status: (s: StatusEvent) => {
                if (this._statusSubject && this._statusSubject.next) {
                    if (s.error) {
                        this._statusSubject.error(s.error);
                    } else {
                        this._statusSubject.next(s);
                    }
                }
            }
        });

        // subscribe to _presenceSubject on the main channel to manage online user, ignore own events.
        let onlineUsersSubscription = this._presenceSubject.pipe(filter(({ uuid, channel }) => uuid !== this.sender.id && channel === this._mainChannel))
            .subscribe((presence: PresenceEvent) => {
                switch (presence.action) {
                    case 'leave':
                        this.onlineUsers.delete(presence.uuid);
                        break;
                    case 'join':
                    case 'state-change':
                        this.onlineUsers.set(presence.uuid, presence.state || {});
                        break;
                    case 'timeout':
                        this.onlineUsers.set(presence.uuid, null);
                        break;
                    case 'interval':
                        each(presence.join, userId => {
                            this.onlineUsers.set(userId, {});
                        });
                        // each(presence.timedout, userId => {
                        //     this.onlineUsers.set(userId, null);
                        // });
                        each(presence.leave, userId => {
                            this.onlineUsers.delete(userId);
                        });

                        if (presence.here_now_refresh && presence.channel === this._mainChannel) {
                            this.updateOnlineUsers();
                        }
                        break;
                }
            });
        this._parentSubscription.add(onlineUsersSubscription);

        let initMessageChannels: string[] = [];
        //we use the main channel for online/presence detection, subscribe to the presence channel as well.
        this.join(this._mainChannel, true);
        this.updateOnlineUsers();
        initMessageChannels.push(this._mainChannel);

        //we use a specific user channel for notification
        this.join(this.sender.id);
        initMessageChannels.push(this.sender.id);

        //we subscribe to each group of the current user for feed notification for example
        if (!this.authentication.isAdmin() && this.session.groups) {
            this.session.groups.forEach(group => {
                this.join(group);
                initMessageChannels.push(group);
            });
        }

        return this.safeMultiplexMessageObservable(initMessageChannels);
        //}));
    }

    updateOnlineUsers() {
        this.pubnub.hereNow({ channels: [this._mainChannel], includeUUIDs: true }).then((response: HereNowResponse<UUIDState<GlobalState>>) => {
            this.onlineUsers.clear();
            response.channels[this._mainChannel].occupants.forEach(occupant => {
                this.onlineUsers.set(occupant.uuid, occupant.state || {});
            });
        });
    }

    disconnect() {
        if (this.sender && this.sender.id && this.pubnub) {
            this.pubnub.unsubscribeAll();
            this.pubnub.removeAllListeners();
            this._channels = {};
            this.pubnub.stop();
        }
        if (this._parentSubscription) {
            this._parentSubscription.unsubscribe();
        }
        delete this._presenceSubject;
        delete this._messageSubject;
        delete this._statusSubject;
        delete this._parentSubscription;
    }

    registerDevice(token, channel, type) {
        this.pubnub.push.addChannels({ device: token, channels: [channel], pushGateway: type }, (error) => {
            if (error) {
                this.log.log('pubnub registered error ' + token, error);
            } else {
                this.log.log('pubnub registered success ' + token);
            }
        });
    }

    unregisterDevice(token, channel, type) {
        this.pubnub.push.removeChannels({ device: token, channels: [channel], pushGateway: type }, (error) => {
            if (error) {
                this.log.log('pubnub unregistered error ' + token, error);
            } else {
                this.log.log('pubnub unregistered success ' + token);
            }
        });
    }
}
