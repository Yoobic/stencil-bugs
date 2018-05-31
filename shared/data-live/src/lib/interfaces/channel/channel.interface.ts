import { Entity, IAcl, User, Model, Editable } from '@shared/data-core';
import { FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Channel',
    collectionName: 'channel',
    fields: null,
    include: ['users'],
    searchSubquery: { collectionName: 'user', field: 'usersRef', values: '_id' }
})

export class Channel extends Entity {
    // export class Channel implements IEntity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;

    channel: string;
    isSupport: boolean;
    isFavorite: boolean;
    isOnline: boolean;
    //All Users in the Channel
    @Editable('Channel', { type: FormFieldType.autocomplete, collectionName: 'user', multiple: true, subQuery: { field: 'usersRef', values: '_id', collectionName: 'user' }, subQueryOverride: { field: 'usersRef', values: '_id', collectionName: 'user' } })
    users: Array<User>;
    //other Users than the logged in user
    others: Array<User>;

    lastMessage: any;
    lastMessageAlternate: boolean;
    lastMessageDate?: any;

    deleteMessages: Array<any>;
}
