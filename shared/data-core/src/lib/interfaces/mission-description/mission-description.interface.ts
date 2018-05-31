import { Translate } from '@shared/translate';
import { IMissionDescription, IScoring, FormFieldType, IFormField  } from '@shared/interfaces';
import { Slide } from '../slide/slide.interface';
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { ROLES_CONDITIONS, Condition, getGroupsTransform } from '../condition/condition.interface';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';

export const MISSION_TYPES_NO_ADMIN = ['mission'];
export const MISSION_TYPES = ['mission', 'service', 'poll', 'todo', 'lesson', 'memo']; //'template',

let conditions = {
    isPoll: 'type == "poll"',
    isMission: 'type == "mission"',
    isQuizz: 'quizz == 1',
    isService: 'type == "service"',
    isPollOrService: 'type=="poll" or type=="service"'//,
    //isUpdate: 'isNullOrEmpty(getAttributeValue("_ect")) == 0'
};

export function onMissionDescriptionTypeChange(value, controls, data, field, formDefinition: Array<IFormField>) {
    if (value && (value === 'service' || value === 'poll' || value === 'lesson')) {
        setTimeout(() => {
            controls.language.setValue(Translate.currentLanguage);
        }, 300);
    }
    let groupIndex = formDefinition.findIndex(f => f.name === 'group');
    let group = formDefinition[groupIndex];
    if (value === 'service') {
        group.title = 'SERVICEGROUPS';
    } else {
        group.title = 'MISSIONGROUPS';
    }
    formDefinition[groupIndex] = { ...group };
    return true;
}

@Model({
    className: 'MissionDescription',
    collectionName: 'missiondescriptions',
    fields: [
        'title', 'text', '_id', '_ect', '_lmt', 'icon', 'background', 'group', 'type', 'archived', 'tags', 'missionTags',
        'scoring', 'versionmin', 'skipValidation', 'allowSameUserValidation', 'allowMultiple', 'quizz', 'quizzMode', 'showAnswers',
        'audit', 'recurring', 'category', 'categoryRef', 'language', 'submittext', 'successtext', 'finishedGroups', 'notificationemail', 'pdfMode'
    ],
    include: [] //'category',
})

export class MissionDescription extends IMissionDescription {
    @Editable('MissionDescription', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 1 })
    _id?: string;

    @Editable('MissionDescription', {
        type: FormFieldType.autocomplete,
        title: 'TYPE',
        values: MISSION_TYPES_NO_ADMIN,
        translate: true,
        clearable: false,
        required: true,
        exportOrder: 3,
        condition: ROLES_CONDITIONS.isNotTrial,
        onChange: onMissionDescriptionTypeChange
    })
    type: string;

    @Editable('MissionDescription', { required: true, title: 'TITLE', type: FormFieldType.text, exportOrder: 2 })
    @Searchable('MissionDescription')
    title: string;

    @Editable('MissionDescription', { required: true, title: 'DESCRIPTION', type: FormFieldType.textarea, filterable: false, sortable: false, language: 'html' }) //
    text: string;

    @Editable('MissionDescription', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 160, maxHeight: 160, crop: 'circle', collectionName: 'files', title: 'ICON', required: true, flex: 50, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    icon: any;

    @Editable('MissionDescription', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 750, maxHeight: 240, crop: 'square', collectionName: 'files', title: 'BACKGROUND', required: true, flex: 50, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    background: any;

    @Editable('MissionDescription', { required: true, title: 'MISSIONGROUPS', flex: 100, type: FormFieldType.autocomplete, condition: ROLES_CONDITIONS.isNotTrial, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, exportOrder: 4 })
    //@Editable('MissionDescription', { required: true, title: 'MISSIONGROUPS', flex: 100, type: FormFieldType.autocomplete, condition: ROLES_CONDITIONS.isNotTrial, sessionValues: 'groups', multiple: true, clearable: false, exportOrder: 4 })
    group: Array<string>;

    @Editable('MissionDescription', { required: false, title: 'MISSIONGROUPS', flex: 100, type: FormFieldType.autocomplete, condition: conditions.isService, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, exportOrder: 4 })
    //@Editable('MissionDescription', { required: false, title: 'MISSIONGROUPS', flex: 100, type: FormFieldType.autocomplete, condition: conditions.isService, sessionValues: 'groups', multiple: true, clearable: false })
    serviceGroups: Array<string>;

    @Editable('MissionDescription', { title: 'CAMPAIGNTAGS', type: 'autocomplete', tag: true, collectionName: 'missiondescriptions', multiple: true, subQuery: { field: 'descriptionRef', values: '_id' }, icon: 'yo-flag', condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    @Searchable('MissionDescription')
    tags: Array<string>;

    @Editable('MissionDescription', { title: 'CATEGORIES', type: 'autocomplete', tag: true, collectionName: 'missions', multiple: true, subQuery: { field: 'descriptionRef', values: '_id' }, icon: 'yo-flag', condition: ROLES_CONDITIONS.isNotTrial, filterable: false })
    @Searchable('MissionDescription')
    missionTags: Array<string>;

    slides: Array<Slide>;

    //@Editable('MissionDescription', { type: FormFieldType.checkbox, title: 'PUBLIC', flex: 100, columnDefinition: { width: 80 }, condition: ROLES_CONDITIONS.isAdmin, filterableAdvanced: true, advanced: true })
    public: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, title: 'SKIPVALIDATION', condition: ROLES_CONDITIONS.isNotTrial, flex: 100, columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    skipValidation: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, title: 'ALLOWSAMEUSERVALIDATION', condition: ROLES_CONDITIONS.isNotTrial, flex: 100, columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    allowSameUserValidation: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, condition: conditions.isPoll, flex: 100, columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    allowMultiple: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, condition: conditions.isPoll, flex: 100, title: 'QUIZZ', columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    quizz: boolean;

    @Editable('MissionDescription', { type: FormFieldType.autocomplete, condition: conditions.isQuizz, flex: 100, title: 'MODE', values: ['ALLANSWERSVALID', 'ALLOWUNVALIDANSWERS', 'LIVEANSWERS'], translate: true, columnDefinition: { width: 80 }, filterable: false, advanced: true })
    quizzMode: string;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, condition: conditions.isQuizz, flex: 100, title: 'SHOWANSWERS', columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    showAnswers: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, condition: [conditions.isMission, ROLES_CONDITIONS.isNotTrial], flex: 100, title: 'AUDIT', columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    audit: boolean;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, condition: [conditions.isMission], flex: 100, title: 'RECURRING', columnDefinition: { width: 80 }, filterableAdvanced: true, advanced: true })
    recurring: boolean;
    // @Editable('MissionDescription', { type: FormFieldType.checkbox, flex: 33, title: 'SMALLPHOTOS', columnDefinition: { width: 80 } })
    // smallPhotos: boolean;

    // @Editable('MissionDescription', { type: FormFieldType.autocomplete, title: 'MISSIONCATEGORY', collectionName: 'missioncategories', required: false, columnDefinition: { name: 'title' }, icon: 'yo-list2', filterable: false, sortable: false, condition: ROLES_CONDITIONS.isAdmin, advanced: true })
    category: MissionDescription;

    @Editable('MissionDescription', { type: FormFieldType.autocomplete, required: true, condition: conditions.isPollOrService, title: 'LANGUAGE', flex: 100, translate: true, values: Translate.availablesLanguageAll, clearable: false })
    language: string;

    @Editable('MissionDescription', { condition: conditions.isService, title: 'SUBMITTEXT', flex: 100, type: FormFieldType.text, filterable: false, sortable: false, advanced: true })
    submittext: string;

    @Editable('MissionDescription', { condition: conditions.isService, flex: 100, title: 'SUCCESSTEXT', type: FormFieldType.text, filterable: false, sortable: false, advanced: true })
    successtext: string;

    @Editable('MissionDescription', { title: 'VERSIONMIN', type: FormFieldType.text, sortable: false, condition: ROLES_CONDITIONS.isAdmin, filterableAdvanced: true, advanced: true })
    versionmin: string;

    @Editable('MissionDescription', { required: false, title: 'FINISHEDGROUPS', flex: 100, type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isNotTrial, conditions.isMission], collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: true, exportOrder: 6, advanced: true })
    finishedGroups: Array<string>;

    @Editable('MissionDescription', { title: 'NOTIFICATIONEMAILS', type: FormFieldType.emailreport, showUsers: true, stateful: false, filterable: false, sortable: false, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    notificationemail: Array<string>;

    @Editable('MissionDescription', { type: FormFieldType.checkbox, readonly: true, visible: false, forceExport: true, columnDefinition: { width: 80 }, exportOrder: 5, advanced: true })
    archived: boolean;

    @Editable('MissionDescription', { title: 'TOTAL', readonly: true, visible: false, type: FormFieldType.number, sortable: false, filterable: false, advanced: true })
    count: number;

    @Editable('MissionDescription', { readonly: true, visible: false, type: FormFieldType.date, sortable: false, filterable: false, advanced: true })
    latest: Date;

    @Editable('MissionDescription', { title: 'PDF', type: FormFieldType.autocomplete, translate: true, values: ['PDFCLASSIC', 'PDFPHOTOREPORT', 'PDFAUDITEXPORTS', 'PDFCONTRACT'], filterable: false, advanced: true })
    pdfMode?: string;

    @Editable('MissionDescription', { name: '_ect', title: 'CREATIONDATE', type: FormFieldType.datetime, readonly: true, filterableAdvanced: true, advanced: true })
    creationDate: any;

    conditions: Array<Condition>;
    scoring: Array<Scoring>;
}

let scoringConditions = {
    isPercentage: 'isPercentage == 1'
};

@Model({ className: 'Scoring' })
export class Scoring extends IScoring {
    @Editable('Scoring', { required: true, type: FormFieldType.text })
    title: string;

    @Editable('Scoring', { type: FormFieldType.textarea })
    description: string;

    @Editable('Scoring', { title: 'INITIALSCORE', type: FormFieldType.number, advanced: true, condition: ROLES_CONDITIONS.isAdmin })
    initialValue: number;

    @Editable('Scoring', { title: 'MINSCOREFORVALIDATION', type: FormFieldType.number, advanced: true })
    minValue: number;

    @Editable('Scoring', { type: FormFieldType.checkbox, title: 'ISPRIMARYSCORE', columnDefinition: { width: 80 } })
    isActive: boolean;

    @Editable('Scoring', { type: FormFieldType.checkbox, title: 'PERCENTAGE', columnDefinition: { width: 80 }, advanced: true })
    isPercentage: boolean;

    @Editable('Scoring', { title: 'TOTAL', type: FormFieldType.number, condition: scoringConditions.isPercentage, required: true })
    percentageBasis: number;

    @Editable('Scoring', { type: FormFieldType.autocomplete, multiple: true, title: 'FIELDS', displayType: 'formfield' })
    selectedFields: Array<IFormField>;

}
