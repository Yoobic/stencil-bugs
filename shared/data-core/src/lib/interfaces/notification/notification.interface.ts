import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, INotification } from '@shared/interfaces';
import { Model } from '../../decorators/model/model.decorator';

@Model({
    className: 'Notification',
    collectionName: 'notifications',
    fields: ['*', 'sender._id', 'sender.firstName', 'sender.lastName', 'sender.username', 'sender.imageData'],
    include: ['sender'] //'creator'
})

export class Notification extends INotification {

    @Editable('Notification', { type: FormFieldType.autocomplete, translate: true, values: ['email', 'notification', 'allnotification'], required: true })
    mode: 'email' | 'notification' | 'allnotification';

    @Editable('Notification', { type: FormFieldType.text, required: true })
    @Searchable('Notification')
    title: string;

    @Editable('Notification', { type: FormFieldType.textarea, required: true })
    body: string;

    @Editable('Notification', { type: FormFieldType.datetime, minDate: new Date(), condition: 'mode!="sms"' })
    scheduledDate?: Date;

    //@Editable('Notification', { type: FormFieldType.autocomplete, values: ['com.ipelia.yoobicv3', 'com.kering.yoobic', 'com.ipelia.yooask'], condition: ROLES_CONDITIONS.isAdmin, clearable: true, translate: true, multiple: true, advanced: true })
    apps?: Array<string>;

}
