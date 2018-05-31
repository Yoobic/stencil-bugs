import { Model, Editable, Searchable } from '@shared/data-core';
import { IUserTrial, FormFieldType } from '@shared/interfaces';

@Model({
    className: 'UserTrial',
    collectionName: 'usertrial'
})
export class UserTrial extends IUserTrial {
    @Editable('UserTrial', { visible: true, required: true, type: FormFieldType.email })
    @Searchable('UserTrial') email: string;

    @Editable('UserTrial', { required: true, flex: 50, type: FormFieldType.text })
    @Searchable('UserTrial')
    firstName: string;

    @Editable('UserTrial', { required: true, flex: 50, type: FormFieldType.text })
    @Searchable('UserTrial')
    lastName: string;

    @Editable('UserTrial', { required: true, flex: 100, type: FormFieldType.inttel, hideLabel: true })
    telephone: string;

    @Editable('UserTrial', { required: true, flex: 100, type: FormFieldType.text })
    company: string;

    @Editable('UserTrial', { required: true, type: FormFieldType.autocomplete, values: ['FOODRETAIL', 'TRAVELRETAIL', 'AUTOMOTIVE', 'FASHIONRETAIL', 'PETROLSTATION', 'COSMETIC', 'AGENCY', 'RESTAURANT', 'PARMACEUTICAL', 'RETAIL'], translate: true, description: 'TRIALUSERTYPE' })
    type: string;

    @Editable('UserTrial', { required: false, flex: 100, type: FormFieldType.text, description: 'TRIALUSERPOSITION' })
    position: string;

    @Editable('UserTrial', { required: false, flex: 100, readonly: true, type: FormFieldType.checkbox, title: 'INITIALIZED' })
    provisioned?: boolean;

}
