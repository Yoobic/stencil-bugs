import { Model, Searchable, Editable } from '@shared/data-core';
import { startCase } from 'lodash-es';
import { IContact, FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Contact',
    collectionName: 'contacts',
    fields: ['*'],
    include: ['location']
})

export class Contact extends IContact {
    // export class Contact implements IEntity {

    @Editable('Contact', { type: FormFieldType.text, visible: false })
    _id: string;

    @Editable('Contact', { type: FormFieldType.photo, filterable: false, title: 'PHOTO', columnDefinition: { width: 52 }, allowLibrary: true })
    imageData: string;

    @Editable('Contact', { required: true, flex: 50, type: FormFieldType.text })
    @Searchable('Contact') firstName: string;

    @Editable('Contact', { flex: 50, required: true, type: FormFieldType.text })
    @Searchable('Contact') lastName: string;

    @Editable('Contact', { required: false, flex: 50, type: FormFieldType.email })
    @Searchable('Contact') email: string;

    @Editable('Contact', { flex: 50, type: FormFieldType.tel })
    telephone: string;

    @Editable('Contact', { flex: 100, type: FormFieldType.text })
    company: string;

    @Editable('Contact', { type: FormFieldType.toggle, flex: 100, title: 'SENDFINISHEDEMAIL' })
    sendFinishedEmail: boolean;

    @Editable('Contact', { title: 'NOTE', type: FormFieldType.textarea })
    @Searchable('Contact')
    note: string;

    static getDisplayName(user: any): string {
        if (user) {
            let displayName = user.username;
            if (user.firstName && user.lastName) {
                displayName = startCase(user.firstName.toLowerCase()) + ' ' + startCase(user.lastName.toLowerCase());
            } else if (user.email) {
                displayName = user.email;
            }
            return displayName;
        }
        return '';
    }
}
