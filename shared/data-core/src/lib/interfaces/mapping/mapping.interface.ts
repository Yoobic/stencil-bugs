import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IIMapping, FormFieldType } from '@shared/interfaces';
import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';

let conditions = {
    isAdmin: 'context == "admin"',
    isFormCreator: 'context == "formCreator"',
    isNotTranslation: 'context!="translation"'
};

@Model({ className: 'IMapping' })
export class IMapping extends IIMapping {
    @Editable('IMapping', {
        required: true,
        autoselect: true,
        type: FormFieldType.autocomplete,
        conditionalValues: [{ condition: conditions.isAdmin, ADMIN_FILES_TYPE }, { condition: conditions.isFormCreator, values: FORMCREATOR_FILES_TYPE }],
        condition: conditions.isNotTranslation,
        defaultValues: ADMIN_FILES_TYPE,
        translate: true
    })
    type: string;

    @Editable('IMapping', { required: true, type: FormFieldType.documentuploader, filterable: false, title: 'DOCUMENT', extensions: ['csv', 'application', 'xls', 'xlsx'] }) //'xls', 'xlsx', //'xls', 'xlsx', , 'application'
    document: any;

}