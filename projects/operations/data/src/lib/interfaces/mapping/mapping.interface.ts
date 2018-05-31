import { Model, Editable, Location } from '@shared/data-core';
import { FormFieldType, ITrialMapping } from '@shared/interfaces';

@Model({ className: 'TrialMapping' })
export class TrialMapping extends ITrialMapping {

    @Editable('TrialMapping', {
        tabIndex: 1,
        tab: 'INTRODUCTION',
        name: 'introduction',
        type: FormFieldType.information,
        value: 'TRIALINTRODUCTION'
    })
    introduction;

    @Editable('TrialMapping', {
        tabIndex: 1,
        tab: 'INTRODUCTION',
        name: 'video',
        type: FormFieldType.image,
        image: { _downloadURL: 'https://res.cloudinary.com/www-yoobic-com/video/upload/v1488993599/public/background.mp4' }
    })
    introductionvideo;

    @Editable('TrialMapping', {
        tabIndex: 2,
        tab: 'LOCATIONS',
        name: 'locations',
        description: 'TRIALCREATENEWLOCATIONS',
        type: FormFieldType.grid,
        collectionName: 'locations',
        multiple: false,
        required: true,
        gridOptions: {
            hideHeader: true,
            allowQuery: false,
            showCreate: true,
            mode: 'create'
        }
    })
    locations: Array<Location>;

    @Editable('TrialMapping', {
        tabIndex: 3,
        tab: 'USERS',
        name: 'users',
        description: 'TRIALCREATENEWUSERS',
        type: FormFieldType.invite,
        required: true,
        roles: ['STOREMANAGER', 'REGIONALMANAGER', 'HEADQUARTER']
    })
    users: Array<{ email: string; roles: Array<string> }>;

    @Editable('TrialMapping', {
        tabIndex: 4,
        tab: 'CAMPAIGN',
        name: 'campaigntype',
        description: 'TRIALCREATENEWCAMPAIGN',
        type: FormFieldType.selectimage,
        required: true,
        values: ['TEMPLATE', 'BLANK'],
        images: [{ _downloadURL: './images/empty-states/template.svg' }, { _downloadURL: './images/empty-states/notemplate.svg' }]
    })
    campaigntype: string;

}
