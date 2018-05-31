import { Component, Prop, Element } from '@stencil/core';
import { CardType, ICardEntry, ICardListEntry, EntityType, IMission, IFeed, IUser, ICardStickyEntry, IFile, IFileOrFolder, IEntityAction, IFeedComment, ITranslateService } from '@shared/interfaces';
import { pipes } from '../../../utils/pipes';
import { getUserDisplayName } from '../../../utils/helpers';
import { isString } from 'lodash-es';

@Component({
    tag: 'yoo-entity',
    styleUrl: 'entity.scss',
    scoped: true
})
export class YooEntityComponent {

    @Prop() item: any;
    @Prop() displayType: CardType;
    @Prop() entityType: EntityType;
    @Prop() useTranslate: boolean;

    @Prop() icons: Array<IEntityAction>;
    @Prop() topActions: Array<IEntityAction>;
    @Prop() bottomActions: Array<IEntityAction>;
    @Prop() secondaryActions: Array<IEntityAction>;

    @Element() host: string;

    private translate: ITranslateService = (window as any).translateService;

    render() {
        if (this.item) {
            if (this.displayType === 'card-sticky') {
                let entry: ICardStickyEntry;
                if (this.entityType === 'feeds') {
                    let feedSticky: IFeed = this.item;
                    entry = {
                        category: feedSticky.tags ? feedSticky.tags[0].toUpperCase() : '',
                        title: feedSticky.title,
                        buttonText: this.translate.get('READMORE'),
                        handler: () => { },
                        imgSrc: feedSticky.image ? feedSticky.image._downloadURL : null
                    };
                    return (
                        <yoo-card-sticky entry={entry}></yoo-card-sticky>
                    );
                }
            } else if (this.displayType === 'card-feed') {
                let entry: ICardEntry;
                if (this.entityType === 'feeds') {
                    let feed: IFeed = this.item;
                    entry = {
                        heading: feed.user && feed.user._id ? getUserDisplayName(feed.user) : feed.missiondescription ? feed.missiondescription.title : '',
                        subheadings: [pipes.timeAgo.transform(feed._ect || new Date())],
                        description: (feed.title || '') + ' ' + this.translate.polyglot(feed.description),
                        tags: feed.tags,
                        imgSrc: feed.image._downloadURL,
                        icon: feed.missiondescription && feed.missiondescription.icon && (!feed.user || !feed.user._id) ? feed.missiondescription.icon._downloadURL : null,
                        user: feed.user,
                        type: this.displayType,
                        groups: [].concat(feed.group)
                    };
                } else if (this.entityType === 'blog') {
                    entry = {
                        heading: this.translate.polyglot(this.item.title),
                        subheadings: [pipes.timeAgo.transform(this.item.pubDate)],
                        description: this.translate.polyglot(this.item.description),
                        icon: this.item.background,
                        imgSrc: this.item.background,
                        type: this.displayType
                    };
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible(this.item)).map(a => {
                    return { icon: a.icon(this.item), handler: () => a.handler(this.item) };
                });
                entry.topActions = this.topActions ? this.topActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.bottomAction = this.bottomActions ? this.bottomActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { name: a.text(this.item), handler: () => a.handler(this.item) };
                })[0] : null;
                entry.actions = this.secondaryActions ? this.secondaryActions.map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item) };
                }) : null;
                return (
                    <yoo-card-feed entry={entry}></yoo-card-feed>
                );
            } else if (this.displayType === 'card-list') {
                let entry: ICardListEntry;
                if (this.entityType === 'missions') {
                    let mission: IMission = this.item;
                    entry = {
                        heading: this.translate.polyglot(mission.title),
                        subheadings: [mission.address],
                        //imgSrc: mission.icon,
                        tags: mission.tags,
                        badges: [
                            mission.status === 'booked' ? { text: this.translate.get('BOOKED'), cssClass: 'small round info' } :
                                mission.status === 'finished' && mission.validated === true ? { text: this.translate.get('VALIDATED'), cssClass: 'small round gradient-success' } :
                                    mission.status === 'finished' && mission.validated === false ? { text: this.translate.get('REJECTED'), cssClass: 'small round danger' } :
                                        mission.status === 'finished' ? { text: this.translate.get('PENDING'), cssClass: 'small round warning' } :
                                            { text: this.translate.get('NEW'), cssClass: 'small round accent' }]
                    };
                } else if (this.entityType === 'users') {
                    let user: IUser = this.item;
                    entry = {
                        heading: getUserDisplayName(user),
                        subheadings: [this.translate.get('LASTSEEN') + ' ' + pipes.timeAgo.transform(user._lmt)],
                        users: [user]
                    };
                } else if (this.entityType === 'feedsComments') {
                    let comment: IFeedComment = this.item;
                    entry = {
                        heading: getUserDisplayName(comment.user),
                        subheadings: [comment.text],
                        date: pipes.dateFormat.transform(comment.date, 'fromNow'),
                        users: [comment.user],
                        avatarSize: 'small'
                    };
                } else if (this.entityType === 'files' || (this.entityType === 'filesFolders' && this.item.fftype === 'file')) {
                    let file: IFile = this.item;
                    entry = {
                        heading: file._filename,
                        icon: file.icon,
                        imgSrc: file.imgSrc,
                        avatarSize: 'list-small',
                        subheadings: [pipes.fileSize.transform(file.size)]
                    };
                } else if (this.entityType === 'folders' || (this.entityType === 'filesFolders' && this.item.fftype === 'folder')) {
                    let f: IFileOrFolder = this.item;
                    entry = {
                        heading: f.name,
                        imgSrc: f.fftype === 'folder' ? './assets/empty-states/folder.svg' : f.imgSrc,
                        icon: f.icon,
                        avatarSize: 'list-small',
                        subheadings: []
                    };
                    if (f.stats) {
                        entry.subheadings = [f.stats.map(s => {
                            return '<span>' + this.translate.get(s.title) + ': ' + pipes.decimal.transform(s.value) + '</span>';
                        }).join()];
                    }

                } else if (this.entityType === 'notifications') {
                    entry = {
                        heading: this.item.title,
                        subheadings: [this.translate.polyglot(this.item.body)],
                        date: this.item.scheduledDate || this.item._ect ? pipes.dateFormat.transform(this.item.scheduledDate || this.item._ect, 'fromNow') : null,
                        users: this.item.sender ? [this.item.sender] : null,
                        icon: this.item.mode === 'email' ? 'yo-mail royal' : this.item.mode === 'notification assertive' ? 'yo-notification' : 'yo-paperplane2 balanced'
                    };
                } else if (this.entityType === 'channel') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: getUserDisplayName(this.item.others[0]),
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        topRightBadge: '3',
                        users: [this.item.others[0]]
                    };
                } else if (this.entityType === 'channels') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: this.item.name,
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        users: this.item.users
                    };
                } else if (this.entityType === 'environnement') {
                    entry = {
                        heading: this.item.title
                    };
                } else {
                    entry = {};
                    let defaultTitle = (this.item.title || this.item._id || (isString(this.item) ? this.item : '')).toString();
                    if (this.item.title === false || this.item._id === false) {
                        defaultTitle = 'false';
                    }
                    let title = this.useTranslate ? this.translate.get(defaultTitle.toUpperCase()) : defaultTitle;
                    entry.heading = title;

                    if (this.item.description) {
                        entry.subheadings = [this.item.description];
                    }
                    if (this.item.background && this.item.background._downloadURL) {
                        entry.imgSrc = this.item.background._downloadURL;
                    }

                    if (this.item.icon && this.item.icon._downloadURL) {
                        entry.imgSrc = this.item.icon._downloadURL;
                    } else if (isString(this.item.icon)) {
                        entry.icon = this.item.icon;
                    } else if (this.entityType === 'groups') {
                        entry.iconText = this.item._id;
                    }

                    if (this.item.badge) {
                        entry.badges = [{ text: this.item.badge }];
                    }
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible(this.item)).map(a => {
                    return { icon: a.icon(this.item), handler: () => a.handler(this.item) };
                });
                entry.topActions = this.topActions ? this.topActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.bottomActions = this.bottomActions ? this.bottomActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.actions = this.secondaryActions ? this.secondaryActions.map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item) };
                }) : null;
                return (
                    <yoo-card-list entry={entry} class={this.entityType} ></yoo-card-list>
                    // (this.entityType === 'feedsComments'  ?
                    //     ((this.item as IFeedComment).comments || []).map(com =>
                    //         <yoo-entity sub-comment item={com} entityType={'feedsComments'} displayType={'card-list'}></yoo-entity>
                    //     ) : null
                );
            } else {
                return (
                    <yoo-card heading={this.item.title} subheadings={this.item.subheadings} class={this.entityType}></yoo-card>
                );
            }
        }
    }

}
