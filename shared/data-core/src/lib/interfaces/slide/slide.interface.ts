import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { ROLES_CONDITIONS, Condition } from '../condition/condition.interface';
import { ISlide, IFormField, FormFieldType } from '@shared/interfaces';

@Model({ className: 'Slide' })
export class Slide extends ISlide {
    @Editable('Slide', { required: true, type: FormFieldType.text })
    title: string;

    @Editable('Slide', { type: FormFieldType.textarea })
    description?: string;

    @Editable('Slide', { type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    hideheader?: boolean;

    @Editable('Slide', { type: FormFieldType.checkbox, flex: 100, condition: [ROLES_CONDITIONS.hasService], advanced: true })
    service?: boolean;

    @Editable('Slide', { type: FormFieldType.autocomplete, multiple: true, clearable: true, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    condition?: Array<Condition>;

    items: Array<IFormField>;
}
