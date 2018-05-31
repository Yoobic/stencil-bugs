import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IWorkplaceGroups, IWorkplacePost  } from '@shared/interfaces';

@Model({
    className: 'WorkplaceGroups',
    collectionName: 'workplace_groups',
    fields: ['*'],
    include: []
})
export class WorkplaceGroups extends IWorkplaceGroups {

    @Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text })
    name: string;

    @Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text })
    icon: string;

    @Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text })
    cover: string;

    @Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text })
    description: string;
}

@Model({ className: 'WorkplacePost' })
export class WorkplacePost extends IWorkplacePost {

    @Editable('WorkplacePost', { type: FormFieldType.textarea, required: true })
    comments: string;

    @Editable('WorkplacePost', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'workplace_groups', multiple: true, required: true })
    workplaceGroups: any;

}
