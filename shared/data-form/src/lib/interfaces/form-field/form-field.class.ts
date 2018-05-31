import { Condition, Model, Editable, Entity, ROLES_CONDITIONS, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, IFormField, IColumnDefinition, MOBILE_FORM_FIELDS_ALL } from '@shared/interfaces';
import { map as _map, flatMap } from 'lodash-es';

let conditions = {
    isNotInformation: 'type!="information"',
    isNotInformationOrTask: 'type!="information" and type!="task"',
    isNotInformationOrDocumentOrImage: 'type!="information" and type!="image" and type!="document"',
    isInformation: 'type=="information"',
    isVideoplayer: 'type=="videoplayer"',
    isAutocomplete: 'type=="autocomplete"',
    isCatalog: 'type=="catalog"',
    isImage: 'type=="image"',
    isDocument: 'type=="document"',
    isPhoto: 'type=="photo" or type=="multiphotos"',
    isMultiPhotos: 'type=="multiphotos"',
    isImageRecognition: 'isImageRecognition==1',
    hasAllowLibrary: 'type=="photo" or type=="video" or type=="multiphotos" or type=="todo"',
    isPhotoOrVideo: 'type=="photo" or type=="video" or type=="multiphotos"',
    isEmailReport: 'type=="emailreport"',
    isSelect: 'type=="select"',
    isSelectImage: 'type=="selectimage"',
    isAdress: 'type=="address"',
    isNumber: 'type=="number"',
    isDate: 'type=="date"',
    isTodo: 'type=="todo"',
    isNumberOrRange: 'type=="number" or type=="range" or type=="knob"',
    isNumberOrRangeOrStarrating: 'type=="number" or type=="range" or type=="starrating"or type=="knob"',
    isStarRating: 'type=="starrating"',
    isAudioOrVideo: 'type=="audio" or type=="video"',
    isConnect: 'type == "connect"',
    isGame: 'type == "game"',
    isFormula: 'type=="formula"',
    hasValues: 'type=="todo" or type=="photo" or type=="multiphotos" or type=="ranking" or type=="select" or type=="selectmulti" or type=="selectbuttons" or type=="selectchat" or type=="selectbuttonsmulti" or type=="autocomplete" or type=="emailreport" or type=="selectimage" or type=="missingword" or type=="swipeselect" or type=="game"',
    missionIsQuizz: <Condition>{ type: 'missionDescriptionAttribute', key: 'quizz', value: true },
    hasSentence: 'type=="missingword" or type=="swipeselect" or type=="selectchat"',
    hasMultiple: 'type=="autocomplete" or type=="selectchat"'
};

export function setConnectAnswerHandler(value, controls, data, form, requestor, dialog, viewContainerRef, changeDetectorRef) {
    dialog.upsert({}, '', viewContainerRef, null,
        [
            { name: 'connectAnswer', title: 'CONNECT', type: FormFieldType.connect, connectMode: data.connectMode, leftValues: data.leftValues, rightValues: data.rightValues }
        ], null, null, null, null, null, null, null, null, null, null, null, false, null).then(retVal => {
            if (retVal) {
                data.answer = flatMap(retVal['connectAnswer']);
                changeDetectorRef.markForCheck();
            }
        });
}

@Model({ className: 'FormField' })
export class FormField extends Entity implements IFormField {
    @Editable('FormField', { type: FormFieldType.text, visible: false })
    name: string;

    @Editable('FormField', { type: FormFieldType.text, required: true })
    title: string;

    icon: string;

    @Editable('FormField', { title: 'INSTRUCTIONS', type: FormFieldType.textarea, condition: conditions.isNotInformation, language: 'html' })
    description: string;

    @Editable('FormField', { title: 'VALUE', required: true, type: FormFieldType.textarea, condition: conditions.isInformation, language: 'html' })
    value: any;

    @Editable('FormField', { title: 'URL', required: true, type: FormFieldType.text, condition: conditions.isVideoplayer })
    url: any;

    @Editable('FormField', { title: 'SENTENCE', type: FormFieldType.textarea, condition: conditions.hasSentence })
    sentence: any;

    @Editable('FormField', { title: 'FORMULA', type: FormFieldType.textarea, condition: conditions.isFormula })
    formula: any;

    header: string;
    filterName: string;

    @Editable('FormField', { type: FormFieldType.autocomplete, required: true, values: _map(MOBILE_FORM_FIELDS_ALL, 'type'), translate: true })
    type: string;

    @Editable('FormField', { title: 'GAME', type: FormFieldType.autocomplete, values: ['runner-game', 'memory-card-game'], translate: true, condition: conditions.isGame, required: true })
    game: string;

    @Editable('FormField', { type: FormFieldType.autocomplete, required: true, collectionName: 'catalogs', idOnly: true, condition: conditions.isCatalog })
    catalog: string;

    @Editable('FormField', { type: FormFieldType.checkbox, condition: [conditions.isCatalog, 'presence != 1'], advanced: true  })
    inventory: boolean;

    @Editable('FormField', { type: FormFieldType.checkbox, condition: [conditions.isCatalog, 'inventory != 1'], advanced: true })
    presence: boolean;

    placeholder: string;
    visible: boolean;

    tag: boolean;

    @Editable('FormField', { title: 'CUSTOMMODEL', type: FormFieldType.autocomplete, collectionName: 'custommodels', idAttributeName: 'name', idOnly: true, condition: conditions.isAutocomplete, advanced: true })
    collectionName: string;

    @Editable('FormField', { type: FormFieldType.toggle, condition: conditions.isAutocomplete, advanced: true })
    filterByLocation: boolean;

    @Editable('FormField', { type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.hasValues })
    values: Array<any>;

    @Editable('FormField', { title: 'MODE', type: FormFieldType.autocomplete, values: ['dragndrop', 'drawing'], translate: true, condition: conditions.isConnect, required: true })
    connectMode: string;

    @Editable('FormField', { type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.isConnect })
    leftValues: Array<any>;

    @Editable('FormField', { type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.isConnect })
    rightValues: Array<any>;

    @Editable('FormField', { type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.isGame })
    correctValues: Array<any>;

    @Editable('FormField', { type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.isGame })
    wrongValues: Array<any>;

    @Editable('FormField', { type: FormFieldType.button, handler: setConnectAnswerHandler, condition: conditions.isConnect })
    setAnswer: any;

    @Editable('FormField', { type: FormFieldType.autocomplete, collectionName: 'user', multiple: true, required: false, tag: true, condition: [conditions.isTodo], advanced: true })
    userTags: Array<string>;

    @Editable('FormField', { title: 'IMAGE', type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, collectionName: 'files', condition: conditions.isImage, columnDefinition: { name: '_filename' } })
    image: any;

    @Editable('FormField', { title: 'IMAGE', type: FormFieldType.autocomplete, multiple: true, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, collectionName: 'files', condition: conditions.isSelectImage, columnDefinition: { name: '_filename' } })
    images: any;

    @Editable('FormField', { title: 'DOCUMENT', type: FormFieldType.autocomplete, collectionName: 'files', condition: conditions.isDocument, columnDefinition: { name: '_filename' } })
    document: any;

    @Editable('FormField', { type: FormFieldType.checkbox, condition: conditions.hasMultiple })
    multiple: boolean;

    @Editable('FormField', { title: 'BUTTONS', type: FormFieldType.checkbox, condition: conditions.isStarRating })
    useButtons: boolean;

    @Editable('FormField', { title: 'MODE', type: FormFieldType.autocomplete, values: ['youtube', 'url'], translate: true, condition: conditions.isVideoplayer, required: true })
    mode: string;

    @Editable('FormField', { visible: false, type: FormFieldType.autocomplete, tag: true, multiple: true, allowCustomTag: true, condition: conditions.missionIsQuizz, dynamicValues: 'values' })
    answer: Array<any>;

    @Editable('FormField', { visible: false, type: FormFieldType.textarea, condition: conditions.missionIsQuizz })
    explanation: string;

    @Editable('FormField', { title: 'EXPLANATIONDOCUMENT', type: FormFieldType.autocomplete, collectionName: 'files', condition: conditions.missionIsQuizz, columnDefinition: { name: '_filename' } })
    explanationDocument: any;

    sessionValues: string;
    filterable: boolean;
    columnDefinition: IColumnDefinition;
    operators: Array<any>;
    hint: string;
    onChange: (value, controls, data) => void;
    subQuery: { field: string; values: string; };
    isSubQuery: boolean;
    //isFieldSelector: boolean;
    displayType: string;
    mapTransform: Function;
    queryFields: Array<string>;
    defaultFields: Array<string>;
    hideLabel: boolean;
    fixedPosition: boolean;
    imageLayout?: string;

    @Editable('FormField', { type: FormFieldType.number, condition: [conditions.isMultiPhotos, ROLES_CONDITIONS.isNotTrial], flex: 50 })
    minPhotos: number;

    @Editable('FormField', { type: FormFieldType.number, condition: [conditions.isMultiPhotos, ROLES_CONDITIONS.isNotTrial], flex: 50, required: true })
    maxPhotos: number;

    @Editable('FormField', { title: 'MANDATORY', type: FormFieldType.checkbox, condition: conditions.isNotInformationOrDocumentOrImage, flex: 50 })
    required: boolean;

    @Editable('FormField', { title: 'ALLOWCOMMENTS', type: FormFieldType.checkbox, condition: conditions.isNotInformation, flex: 50 })
    allowComments: boolean;

    @Editable('FormField', { title: 'ALLOWTASK', type: FormFieldType.checkbox, condition: [conditions.isNotInformationOrTask, ROLES_CONDITIONS.hasTodo], flex: 50 })
    allowTask: boolean;

    @Editable('FormField', { title: 'SHARETOFEED', type: FormFieldType.checkbox, flex: 50, condition: [conditions.isPhoto] })
    shareToFeed: boolean;

    @Editable('FormField', { title: 'ALLPHOTOSREQUIRED', type: FormFieldType.checkbox, flex: 100, condition: [conditions.isTodo] })
    allPhotosRequired: boolean;

    @Editable('FormField', { type: FormFieldType.checkbox, condition: conditions.isAutocomplete, flex: 100, advanced: true })
    clearable: boolean;

    @Editable('FormField', { title: 'ALLOWTIME', type: FormFieldType.checkbox, condition: [conditions.isNotInformation, ROLES_CONDITIONS.isNotTrial], flex: 100, advanced: true })
    allowTime: boolean;

    @Editable('FormField', { title: 'ALLOWLIBRARY', type: FormFieldType.checkbox, condition: conditions.hasAllowLibrary, flex: 100 })
    allowLibrary: boolean;

    @Editable('FormField', { title: 'GEOLOC', type: FormFieldType.checkbox, condition: conditions.isPhotoOrVideo, flex: 100, advanced: true })
    saveGeoloc: boolean;

    @Editable('FormField', { title: 'ALLOWHISTORY', type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    allowHistory: boolean;

    @Editable('FormField', { title: 'ALLOWOPENDETAILS', type: FormFieldType.checkbox, flex: 100, condition: conditions.isSelectImage, advanced: true })
    allowOpenDetails: boolean;

    //@Editable('FormField', { title: 'SHOWONLOCATION', type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    showOnLocation: boolean;

    @Editable('FormField', { title: 'LINKTOPREVIOUSQUESTION', type: FormFieldType.checkbox, flex: 100, condition: [conditions.isTodo, ROLES_CONDITIONS.isNotTrial], advanced: true })
    linked: boolean;

    @Editable('FormField', { title: 'ALLOWANNOTATE', type: FormFieldType.checkbox, condition: [conditions.isPhoto, ROLES_CONDITIONS.isNotTrial], flex: 100, advanced: true })
    allowAnnotate: boolean;

    @Editable('FormField', { title: 'SHOWUSERSEMAIL', type: FormFieldType.checkbox, condition: conditions.isEmailReport, flex: 100, advanced: true })
    showUsers: boolean;

    @Editable('FormField', { title: 'HIDEMOBILE', type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    hideMobile: boolean;

    @Editable('FormField', { title: 'OTHER1', type: FormFieldType.checkbox, condition: conditions.isSelect, flex: 100, advanced: true })
    allowOther: boolean;

    @Editable('FormField', { type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    readonly: boolean;

    @Editable('FormField', { title: 'RADIUS', type: FormFieldType.number, condition: conditions.isAdress, flex: 100, advanced: true })
    radius: number;

    @Editable('FormField', { title: 'MIN', type: FormFieldType.number, condition: conditions.isNumberOrRange, flex: 100, advanced: false })
    min: number;

    @Editable('FormField', { title: 'MAX', type: FormFieldType.number, condition: conditions.isNumberOrRangeOrStarrating, flex: 100, advanced: false })
    max: number;

    @Editable('FormField', { title: 'STEP', type: FormFieldType.number, condition: conditions.isNumber, flex: 100, advanced: true })
    step: number;

    @Editable('FormField', { title: 'MIN', type: FormFieldType.date, condition: conditions.isDate, flex: 100, advanced: true })
    minDate: Date;

    @Editable('FormField', { title: 'MAX', type: FormFieldType.date, condition: conditions.isDate, flex: 100, advanced: true })
    maxDate: Date;

    @Editable('FormField', { title: 'SHOWSERVICE', type: FormFieldType.checkbox, flex: 100, condition: ROLES_CONDITIONS.hasService, advanced: true })
    showService: boolean;

    @Editable('FormField', { type: FormFieldType.number, condition: [conditions.isPhoto, ROLES_CONDITIONS.isNotTrial], flex: 100, advanced: true })
    maxWidth: number;

    @Editable('FormField', { type: FormFieldType.number, condition: [conditions.isPhoto, ROLES_CONDITIONS.isNotTrial], flex: 100, advanced: true })
    maxHeight: number;

    @Editable('FormField', { type: FormFieldType.toggle, condition: [conditions.isPhoto, ROLES_CONDITIONS.isAdmin, ROLES_CONDITIONS.isNotTrial], flex: 100, title: 'PHOTOLIVECOUNTER', advanced: true })
    isImageRecognition: boolean;

    @Editable('FormField', { type: FormFieldType.autocomplete, required: true, collectionName: 'algorithm', condition: conditions.isImageRecognition, flex: 100, title: 'ALGORITHM', advanced: true })
    imageRecognitionAlgorithm: any;

    @Editable('FormField', { title: 'DURATIONMAX', type: FormFieldType.number, condition: conditions.isAudioOrVideo, flex: 100, max: 60 })
    duration: number;

    @Editable('FormField', { type: FormFieldType.autocomplete, multiple: true, clearable: true, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    condition: Array<Condition>;

    @Editable('FormField', { title: 'FLEX', type: FormFieldType.number, flex: 100, min: 0, max: 100, advanced: true })
    flex: number;

    @Editable('FormField', { title: 'LEGEND', type: FormFieldType.textarea, condition: conditions.isNotInformation, advanced: true })
    caption: string;

    @Editable('FormField', { title: 'REPORTORDER', type: FormFieldType.number, flex: 100, min: 0, advanced: true })
    reportOrder: number;

}