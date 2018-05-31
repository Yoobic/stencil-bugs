import { Editable, Searchable, User, Model } from '@shared/data-core';
import { IPharmaoneNotification, FormFieldType, IPharmaonePayment } from '@shared/interfaces';

@Model({
    className: 'PharmaoneNotification'
})
export class PharmaoneNotification extends IPharmaoneNotification {

    @Editable('PharmaoneNotification', { required: true, type: FormFieldType.text })
    @Searchable('PharmaoneNotification')
    title: string;

    @Editable('PharmaoneNotification', { required: true, type: FormFieldType.number })
    @Searchable('PharmaoneNotification')
    amount: number;

    @Editable('PharmaoneNotification', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        icon: 'yo-user',
        required: true,
        columnDefinition: { name: 'username' }
    })
    user: User;

    @Editable('PharmaoneNotification', { required: false, type: FormFieldType.datetime })
    date: Date;

    @Editable('PharmaoneNotification', { required: false, type: FormFieldType.textarea })
    @Searchable('PharmaoneNotification')
    comments: string;

}

export function onPaymentUserChange(user: User, fieldControls, data) {
    if (!user) {
        data.ownerDisplayName = null;
        data.ownerRef = null;
    } else {
        data.userId = user._id;
    }
}

@Model({
    className: 'Payment',
    collectionName: 'payments',
    fields: ['*', 'user._id', 'user.firstName', 'user.lastName', 'user.username', 'user.imageData'],
    include: ['user']
})

export class PharmaonePayment extends IPharmaonePayment {
    @Editable('PharmaonePayment', { type: FormFieldType.text, required: true })
    title: string;

    @Editable('PharmaonePayment', { type: FormFieldType.number, required: true })
    amount: number;

    @Editable('PharmaonePayment', { type: FormFieldType.textarea })
    details?: string;

    @Editable('PharmaonePayment', { type: FormFieldType.datetime })
    transactionDate: Date;

    @Editable('PharmaonePayment', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        icon: 'yo-user',
        required: true,
        columnDefinition: { name: 'username' },
        onChange: onPaymentUserChange
    })
    user;
}