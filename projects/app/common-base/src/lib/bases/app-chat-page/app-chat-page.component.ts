import { Injectable, OnInit, OnChanges, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { HttpsPipe, Utils } from '@shared/common';
import { IChatMessage } from '@shared/interfaces';
import { Files, User } from '@shared/data-core';
import { ChannelInterface, ChatMessage as Message, Pubnub, Channel, Channels } from '@shared/data-live';
import { YooChatComponent } from '@shared/design-system/types';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { each, some, remove, map, filter as _filter, isEmpty, uniqBy } from 'lodash-es';

@Injectable()
export class AppChatBasePageComponent extends BasePageBaseComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('chat') chatEl: ElementRef<YooChatComponent>;

    @Input() channel: ChannelInterface | Channels;
    @Input() photo: any;
    ///@Input() addEmptyMessage: boolean;

    public canLoadMore;
    public messages: Array<Message>;
    public someoneIsTyping;
    public selfIsTyping;
    public loading;
    public name: string;
    public others: any;
    public othersTyping: Message;
    public othersTypingDisplay: IChatMessage;
    public channelSubscription: Subscription;
    public messagesDisplay: Array<IChatMessage>;

    protected pubnub: Pubnub;
    protected files: Files;
    protected channelService: Channel;

    protected isDestroyed: boolean;

    private firstMessageTimeToken: number;
    private pageSize;
    private httpsPipe;
    private photos: Array<any>;

    private get me(): User {
        return this.session.user;
    }

    initExtraProviders() {
        super.initExtraProviders();
        this.pubnub = this.injector.get<Pubnub>(Pubnub);
        this.files = this.injector.get<Files>(Files);
        this.channelService = this.injector.get<Channel>(Channel);

        this.othersTyping = { channel: '', sender_id: '', date_sent: new Date(), message: 'no one is typing', receiver_id: '' };
        this.othersTypingDisplay = { content: '', isAlternate: false, author: null, img: '' };
        this.pageSize = 10;
        this.photos = [];
    }

    ngOnInit() {
        this.init();
        this.httpsPipe = new HttpsPipe(this.coreConfig, this.injector.get<Utils>(Utils));
    }

    ngOnChanges(changes) {
        if (changes.channel && changes.channel.previousValue && changes.channel.previousValue.channel) {
            this.pubnub.leave(changes.channel.previousValue.channel);
            remove(this.session.openedChannels, c => c === changes.channel.previousValue.channel);
            this.init();
        }
    }

    ngOnDestroy() {
        if (this.channel) {
            if (this.channelSubscription && this.channelSubscription.unsubscribe) {
                this.channelSubscription.unsubscribe();
            }
            this.pubnub.leave(this.channel.channel);
            remove(this.session.openedChannels, c => c === this.channel.channel);
        }
        this.isDestroyed = true;
    }

    onChatClosure(event) { }

    init() {
        this.messages = [];
        this.messagesDisplay = [];
        this.photos = [];
        this.canLoadMore = false;
        this.firstMessageTimeToken = null;
        let usersTyping = {};
        if (this.channel && this.channel.users && this.channel.users.length > 1) {
            each(this.channel.users, u => {
                usersTyping[u._id] = {
                    name: User.getDisplayName(u),
                    isTyping: false
                };
            });
            this.channelSubscription = this.pubnub.join(this.channel.channel, true, true).subscribe((val: any) => {
                this.messages.push(val);
                this.updateMessages();
            });
            this.session.openedChannels.push(this.channel.channel);
            let channelTypingSubscription = this.pubnub.getChannelTyping(this.channel.channel).pipe(filter((value) => !isEmpty(value))).subscribe(([userId, isTyping]) => {
                usersTyping[userId] = usersTyping[userId] || {};
                usersTyping[userId].isTyping = isTyping;

                this.someoneIsTyping = some(usersTyping, 'isTyping');
                if (!this.someoneIsTyping) {
                    this.othersTyping.message = '';
                    this.updateMessages();
                } else {
                    let names = map(_filter(usersTyping, 'isTyping'), 'name');
                    this.othersTyping.message = `<i>${names.join(', ')} ${names.length === 1 ? 'is' : 'are'} typing...<i>`;
                    this.messages.push(this.othersTyping);
                    this.messagesDisplay.push(this.othersTypingDisplay);
                    this.cd.markForCheck();
                    setTimeout(() => this.scrollToBottom(), 100);
                }
            });
            this.channelSubscription.add(channelTypingSubscription);
            this.loadMore(true, false);
        }
        // if (this.addEmptyMessage) {
        //     setTimeout(() => {
        //         if (this.messages.length === 0 && this.channel && this.channel.channel) {
        //             this.messages.push({
        //                 date_sent: new Date(),
        //                 message: this.translate.get('SUPPORTINTRO'),
        //                 channel: this.channel.channel,
        //                 sender_username: this.translate.get('SUPPORTEMAIL'),
        //                 icon: './assets/logo/logo.png'
        //             });
        //             this.updateMessages();
        //         }
        //     }, 1000);
        // }

        if (this.photo) {
            this.sendPhoto(this.photo);
        }
    }

    getTitle() {
        if (this.channel && (<Channels>this.channel).name) {
            return (<Channels>this.channel).name;
        } else if (this.channel && this.channel.users) {
            let user = this.channel.users.find(u => u._id !== this.session.userId);
            if (user) {
                return User.getDisplayName(user);
            }
        }
        return '';
    }

    loadMore(force: boolean = false, top: boolean = true) {
        if ((this.canLoadMore || force) && !this.loading) {
            this.loading = true;
            this.canLoadMore = false;
            this.cd.markForCheck();
            this.pubnub.getHistory(this.channel.channel, this.pageSize, this.firstMessageTimeToken)
                .subscribe(res => {
                    this.messages = (res[0] || []).concat(this.messages);
                    this.firstMessageTimeToken = res[1];
                    this.updateMessages(top);
                    if (res[0].length === this.pageSize) {
                        this.canLoadMore = true;
                    }
                    this.loading = false;
                    this.cd.markForCheck();
                });
        }
    }

    sendMessage(currentMessage: string, photo?: any) {
        if (currentMessage && this.channel && this.channel.others && this.channel.others[0] && this.channel.others[0]._id) {
            this.channelService.update(<any>this.channel).subscribe(_ => { });
            this.pubnub.sendChatMessage(this.channel.channel, currentMessage, this.channel.others[0]._id, null, <any>this.channel, photo);
        }
    }

    sendPhoto(photo: any) {
        if (this.channel) {
            let value = this.files.getUrlWithAnnotations(photo.value, photo);
            let currentMessage = '<ionic-chat-image src="' + value + '" ></ionic-chat-image>';
            this.sendMessage(currentMessage, photo);
        }
    }

    updateMessages(top = false) {
        let typingIndex;
        let photoSrc = '';
        this.messages = uniqBy(this.messages, m => [m.sender_id, m.message, m.date_sent].join());
        this.messages.forEach((m, i) => {
            // we should not handle the typing message
            if (m === this.othersTyping) {
                typingIndex = i;
                return;
            }
            let user = this.channel.users.find(u => u._id === m.sender_id);

            if (m.message) {
                if (m.message.indexOf('ionic-chat-image') > 0) {
                    photoSrc = this.getPhotoSrc(m);
                    if (m.photo) {
                        m.photo.value = photoSrc;
                        this.photos.push(m.photo);
                    } else {
                        if (photoSrc) {
                            this.photos.push({ value: photoSrc });
                        }
                    }
                    //m.message = m.message.replace('<ionic-chat-image', '<img').replace('</ionic-chat-image>', '');
                    m.message = this.httpsPipe.transform(m.message);
                }
                this.messagesDisplay[i] = {
                    content: photoSrc ? '' : m.message,
                    img: photoSrc,
                    //initial: this.getInitials(m),
                    isAlternate: this.isAlternate(m),
                    //showDateHeader: this.showDateHeader(i),
                    //showImageAndDate: this.showImageAndDate(i),
                    time: m.date_sent,
                    author: user,
                    deleted: (<any>this.channel).deleteMessages && (<any>this.channel).deleteMessages.indexOf(m.date_sent) >= 0
                };
            }
        });
        if (typingIndex) {
            this.messages.splice(typingIndex, 1);
            this.messagesDisplay.splice(typingIndex, 1);
        }
        this.messagesDisplay = [...this.messagesDisplay];
        this.cd.markForCheck();
        setTimeout(() => top ? this.scrollToTop() : this.scrollToBottom(), 300);
    }

    getPhotoSrc(m: Message): string {
        if (m && m.message) {
            let retVal = m.message;
            let start = retVal.indexOf('src="');
            retVal = retVal.substring(start + 5);
            retVal = retVal.substring(0, retVal.indexOf('"'));
            return retVal;
        }
        return '';
    }

    scrollToBottom() {
        if (this.chatEl && this.chatEl.nativeElement) {
            this.chatEl.nativeElement.scrollToBottom();
        }
    }

    scrollToTop() {
        if (this.chatEl && this.chatEl.nativeElement) {
            this.chatEl.nativeElement.scrollToTop();
        }
    }

    // showImageAndDate(index: number, end = true): boolean {
    //     if (end) {
    //         return index === this.messages.length - 1 || this.messages[index].sender_id !== this.messages[index + 1].sender_id;
    //     } else {
    //         return index === 0 || this.messages[index].sender_id !== this.messages[index - 1].sender_id;
    //     }
    // }

    // showDateHeader(index: number): boolean {
    //     return index === 0 || moment(this.messages[index].date_sent).format('dddd dd') !== moment(this.messages[index - 1].date_sent).format('dddd dd');
    // }

    isAlternate(message: Message): boolean {
        return message.sender_id === this.me._id;
    }

    onSendText(ev) {
        this.sendMessage(ev.detail);
    }

    // getImage(message: Message): string {
    //     if (message.icon) {
    //         return message.icon;
    //     }
    //     let users = this.channel.users.filter(u => u._id === message.sender_id);
    //     if (users && users.length > 0) {
    //         return users[0].imageData;
    //     }
    //     return '';
    // }

    // getInitials(message: Message): string {
    //     let users = this.channel.users.filter(u => u._id === message.sender_id);
    //     if (users && users.length > 0) {
    //         return this.userinitialPipe.transform(users[0]);
    //     }
    //     return '';
    // }

    setIsTyping(isTyping: boolean) {
        if (this.selfIsTyping !== isTyping && this.channel && this.channel.channel) {
            this.selfIsTyping = isTyping;
            return this.pubnub.setIsTyping(this.channel.channel, this.selfIsTyping);
        } else {
            return Promise.resolve(this.selfIsTyping);
        }
    }

    setIsLoading(isLoading: boolean) {
        this.loading = isLoading;
        this.cd.markForCheck();
    }

}