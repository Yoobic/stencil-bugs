import { Model, Editable, User, MissionDescription } from '@shared/data-core';
import { FormFieldType, ICampaignfilter } from '@shared/interfaces';

export function onCampaignFilterUserChange(user, fieldControls, data) {
    data.username = user.username;
}

@Model({
    className: 'Campaignfilter',
    collectionName: 'campaignfilters',
    fields: ['*'],
    include: []
})

export class Campaignfilter extends ICampaignfilter {

    @Editable('Campaignfilter', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        clearable: true,
        columnDefinition: {
            name: 'username'
        },
        onChange: onCampaignFilterUserChange
    })
    user: User;

    @Editable('Campaignfilter', {
        type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', clearable: true, multiple: true,
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    campaigns: Array<MissionDescription>;
}
