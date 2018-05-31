import { Model } from '../../decorators/model/model.decorator';
import { FormFieldType, IAutorenewConfig } from '@shared/interfaces';
import { MissionDescription } from '../mission-description/mission-description.interface';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';

import { range } from 'lodash-es';

@Model({
    className: 'AutorenewConfig',
    collectionName: 'autorenewConfig',
    fields: ['*'],
    include: ['descriptionSource', 'descriptionTarget']
})
export class AutorenewConfig extends IAutorenewConfig {
    @Editable('AutorenewConfig', { required: true, type: FormFieldType.text })
    @Searchable('AutorenewConfig') title: string;

    @Editable('AutorenewConfig', { required: true, title: 'PREFIX', type: FormFieldType.text, flex: 50 })
    @Searchable('AutorenewConfig') prefix_title: string;

    @Editable('AutorenewConfig', { type: FormFieldType.autocomplete, translate: true, values: range(1, 5), flex: 50, clearable: true, icon: 'yo-flag' })
    priority?: number;

    @Editable('AutorenewConfig', {
        type: FormFieldType.autocomplete, title: 'SOURCE', collectionName: 'missiondescriptions', required: false, columnDefinition: { name: 'title' }, icon: 'yo-list2', filterable: false, sortable: false,
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    descriptionSource: MissionDescription;

    @Editable('AutorenewConfig', {
        type: FormFieldType.autocomplete, title: 'TARGET', collectionName: 'missiondescriptions', required: false, columnDefinition: { name: 'title' }, icon: 'yo-list2', filterable: false, sortable: false,
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    descriptionTarget: MissionDescription;

    @Editable('AutorenewConfig', { type: FormFieldType.toggle })
    @Searchable('AutorenewConfig') active: boolean;

}