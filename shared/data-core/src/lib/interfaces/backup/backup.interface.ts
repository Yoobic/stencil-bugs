import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IBackup } from '@shared/interfaces';

@Model({
    className: 'Backup',
    fields: ['*'],
    include: []
})
export class Backup extends IBackup {

    @Editable('Backup', { required: false, type: FormFieldType.date })
    date: Date;

    @Editable('Backup', { required: true, type: FormFieldType.autocomplete, clearable: true })
    backup: { _id: string, name: string; description: string; badge: string };

    @Editable('Backup', { required: false, type: FormFieldType.autocomplete, clearable: true, multiple: true, values: ['missions', 'missiondescription', 'missiondatas', 'user', 'locations', 'locationtypes', 'missiondatas', 'photos'] })
    collections: Array<string>;

}
