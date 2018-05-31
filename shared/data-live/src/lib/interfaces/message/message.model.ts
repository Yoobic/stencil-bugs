import { MessageInterface } from './message.interface';
import { Entity, IAcl, Model, Editable, Searchable } from '@shared/data-core';
import { FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Message',
    collectionName: 'messages',
    fields: ['*', 'from.imageData', 'from.username', 'from.email'],
    include: ['from']
})
export class Message extends Entity implements MessageInterface {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;

    @Editable('Message', { title: 'TO', type: FormFieldType.emailreport, required: true, showUsers: true })
    @Searchable('Message') to: Array<string>;

    @Editable('Message', { title: 'SUBJECT', required: true, type: FormFieldType.text })
    @Searchable('Message') title: string;

    @Editable('Message', { title: 'BODY', required: true, type: FormFieldType.textarea })
    body: string;

    // @Editable('Message', { title: 'FOOTER', type: FormFieldType.textarea })
    // footer: string;

    actionURL: string;
    actionText: string;

    @Editable('Message', { title: 'THANKYOU', type: FormFieldType.text })
    thankyou: string;
}
