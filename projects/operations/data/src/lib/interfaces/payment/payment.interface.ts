import { Model, Editable } from '@shared/data-core';
import { IPayment, FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Payment',
    collectionName: 'payments',
    fields: ['*', 'user._id', 'user.firstName', 'user.lastName', 'user.username', 'user.imageData'],
    include: ['user']
})

export class Payment extends IPayment {
    @Editable('Payment', { readonly: true, type: FormFieldType.number })
    amount: number;

    @Editable('Payment', { readonly: true, type: FormFieldType.email })
    paypalEmail?: string;

    @Editable('Payment', { readonly: true, type: FormFieldType.date })
    transactionDate: Date;

    type: string;
    userId: string;
    details: string;
}
