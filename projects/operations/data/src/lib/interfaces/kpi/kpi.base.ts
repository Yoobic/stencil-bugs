import { MissionDescription, Model, Editable, Entity, TagGroup } from '@shared/data-core';
import { FormFieldType, IDatesRange } from '@shared/interfaces';

export { BaseKpi } from '@shared/data-core';

@Model({ className: 'KpiGenericFilter' })
export class KpiGenericFilter extends Entity {

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL1', flex: 25, mode: 'text', clearable: true, fixedPosition: true, visible: false })
    tagGroup1: TagGroup;

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL2', flex: 25, mode: 'text', clearable: true, fixedPosition: true, visible: false })
    tagGroup2: TagGroup;

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL3', flex: 25, mode: 'text', clearable: true, fixedPosition: true, visible: false })
    tagGroup3: TagGroup;

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL4', flex: 25, mode: 'text', clearable: true, fixedPosition: true, visible: false })
    tagGroup4: TagGroup;

    @Editable('KpiGenericFilter', {
        type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, flex: 100, mode: 'text', fixedPosition: true //,
        // filters: [
        //     [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        // ],
        // hiddenFields: ['archived']
    })
    campaigns: Array<MissionDescription>;

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, flex: 100, tag: true, fixedPosition: true })
    campaignTags: Array<string>;

    @Editable('KpiGenericFilter', { type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, flex: 100, tag: true })
    locationTags: Array<string>;

    @Editable('KpiGenericFilter', { type: FormFieldType.toggle, flex: 100, title: 'UPDATEDATES' })
    enableDates: boolean;

    @Editable('KpiGenericFilter', { type: FormFieldType.daterange, flex: 100, hideLabel: true, noPadding: true, condition: 'enableDates == 1' })
    dates: IDatesRange;
}

@Model({ className: 'KpiAutoFilter' })
export class KpiAutoFilter extends Entity {
    @Editable('KpiAutoFilter', { type: FormFieldType.daterange, flex: 100, hideLabel: true, noPadding: true })
    dates: IDatesRange;
}
