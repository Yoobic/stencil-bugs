import { Model, Editable, MissionDescription } from '@shared/data-core';
import { IMissionArchive, FormFieldType } from '@shared/interfaces';

@Model({ className: 'MissionArchive' })
export class MissionArchive extends IMissionArchive {

    @Editable('MissionArchive', {
        name: 'campaigns',
        type: FormFieldType.grid,
        collectionName: 'missiondescriptions',
        multiple: true,
        required: true,
        gridOptions: {
            allowQuery: false,
            hiddenFields: ['type', 'public']
        }
    })
    campaigns: { selection: Array<MissionDescription> }; //Array<MissionDescription>; // |

    @Editable('MissionArchive', { type: FormFieldType.toggle })
    archiveMissions: boolean;

}
