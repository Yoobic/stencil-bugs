import { FormFieldType, ITranslation } from '@shared/interfaces';
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Translate } from '@shared/translate';
import { Googletranslate } from '../../services/googletranslate/googletranslate.service';
import { Requestor } from '../../services/requestor/requestor.service';
import { getGroupsTransform } from '../condition/condition.interface';

import { capitalize } from 'lodash-es';

export function translateButtonHandler(buttonValue, fieldControls, data, form, rq: Requestor) {
    let language = fieldControls.language.value;
    let value = fieldControls.value.value;
    if (value && language) {
        fieldControls[language].markAsTouched();
        fieldControls[language].setValue(value);
        Googletranslate.getAll(value, language, rq).subscribe((values: Array<{ language: string; value: string; }>) => {
            let isCapitalized = capitalize(value) === value;
            values.forEach(v => {
                if (fieldControls && fieldControls[v.language] && !fieldControls[v.language].value) {
                    fieldControls[v.language].markAsTouched();
                    fieldControls[v.language].setValue(isCapitalized ? capitalize(v.value) : v.value);
                }
            });
        });
    }
}

export function resetButtonHandler(buttonValue, fieldControls, data) {
    Translate.availablesLanguage.forEach(l => {
        if (fieldControls[l] && fieldControls[l].setValue) {
            fieldControls[l].setValue(null);
        }
    });
}

@Model({
    className: 'Translation',
    collectionName: 'translations',
    fields: ['*'],
    include: []
})
export class Translation extends ITranslation {
    @Editable('Translation', { title: 'ID', visible: false, forceExport: true })
    _id?: string;

    @Editable('Translation', { type: FormFieldType.autocomplete, title: 'LANGUAGE', translate: true, values: Translate.availablesLanguage, clearable: false, required: true, autoselect: true, columnDefinition: { width: 40 } })
    language: string;

    @Editable('Translation', { required: true, type: FormFieldType.text })
    @Searchable('Translation') key: string;

    @Editable('Translation', {
        required: true,
        type: FormFieldType.text
    })
    value: string;

    @Editable('Translation', {
        type: FormFieldType.button,
        title: 'TRANSLATE',
        flex: 50,
        suppressExport: true,
        handler: translateButtonHandler
    })
    translateButton?: any;

    @Editable('Translation', {
        type: FormFieldType.button,
        title: 'RESET',
        suppressExport: true,
        color: 'assertive light',
        handler: resetButtonHandler,
        flex: 50
    })
    resetButton?: any;

    @Editable('Translation', { required: true, type: FormFieldType.text }) en: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) us: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) fr: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) es: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) pl: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) nl: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) de: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) it: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) ru: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) zhs: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) zht: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) pt: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) kr: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) ja: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) ua: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) he: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) ar: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) cz: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) th: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) tr: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) bg: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) el: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) sl: string;

    @Editable('Translation', { required: true, type: FormFieldType.text }) sk: string;

    @Editable('Translation', { type: FormFieldType.toggle, title: 'UNVALIDATEREASON' })
    isReject: boolean;

    @Editable('Translation', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string | Array<string>;

    @Editable('Translation', { type: FormFieldType.toggle, title: 'ANNOTATE' })
    isPhotoAnnotation: boolean;
}
