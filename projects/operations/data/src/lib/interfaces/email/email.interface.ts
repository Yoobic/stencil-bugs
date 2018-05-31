import { Model, Editable } from '@shared/data-core';
import { IEmailReport, IUnblockEmails, FormFieldType } from '@shared/interfaces';

@Model({ className: 'EmailReport' })
export class EmailReport extends IEmailReport {

    @Editable('EmailReport', { required: false, type: FormFieldType.textarea })
    comment: string;

    @Editable('EmailReport', { required: false, type: FormFieldType.emailreport })
    emails: Array<string>;

}

@Model({ className: 'UnblockEmails' })
export class UnblockEmails extends IUnblockEmails {

    @Editable('UnblockEmails', { required: false, type: FormFieldType.emailreport })
    emails: Array<string>;

}
