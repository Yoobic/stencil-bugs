import { ICondition } from '../condition/condition.interface';
import { SubQuery, Filters } from '../filters/filters.interface';
import { IColumnDefinition } from '../column-definition/column-definition.interface';
import { uniqBy } from 'lodash-es';

export interface IFormField {
    title?: string;
    icon?: string;
    description?: string;
    caption?: string;
    header?: string;
    name?: string;
    tooltip?: string;
    filterName?: string;
    type?: string;
    mode?: string;
    dynamicType?: string;
    defaultType?: string;
    handleUndefined?: boolean;
    placeholder?: string;
    visible?: boolean;
    condition?: Array<ICondition | string | any> | string | ICondition;
    multiple?: boolean;
    idOnly?: boolean;
    idAttributeName?: string;
    autoselect?: boolean;
    tag?: boolean;
    allowCustomTag?: boolean;
    collectionName?: string;
    catalog?: string;
    required?: boolean | string | ICondition | Array<ICondition>;
    readonly?: boolean | string | ICondition | Array<ICondition>;
    clearable?: boolean;
    values?: Array<any>;
    value?: any;
    dynamicValues?: string;
    defaultValues?: Array<any>;
    conditionalValues?: Array<any>;
    field?: IFormField;
    sessionValues?: string;
    filterable?: boolean;
    filterableAdvanced?: boolean;
    sortable?: boolean;
    columnDefinition?: IColumnDefinition;
    operators?: Array<any>;
    hint?: string;
    onChange?: (value, controls, data, field?: IFormField, formDefinition?: Array<IFormField>, formDynamic?) => any;
    onBlur?: (value, controls, data) => void;
    subQuery?: SubQuery;
    subQueryOverride?: SubQuery;
    isSubQuery?: boolean;
    displayType?: string;
    mapTransform?: Function;
    queryFields?: Array<string>;
    defaultFields?: Array<string>;
    flex?: number;
    translate?: boolean;
    showUsers?: boolean;
    stateful?: boolean;
    showMap?: boolean;
    allowComments?: boolean;
    allowTime?: boolean;
    allowAnnotate?: boolean;
    tab?: string;
    tabIndex?: number;
    tabCondition?: Array<ICondition> | string | ICondition;
    extensions?: Array<string>;
    cellRenderer?: (value, field, params, translate) => string;
    validators?: Array<(injector) => any>;
    asyncValidators?: Array<(injector) => any>;
    min?: number;
    max?: number;
    step?: number;
    minDate?: Date;
    maxDate?: Date;
    maxWidth?: number;
    maxHeight?: number;
    minPhotos?: number;
    maxPhotos?: number;
    crop?: string;
    allowLibrary?: boolean;
    allowHistory?: boolean;
    debounce?: number;
    gridOptions?: any;
    hideLabel?: boolean;
    noPadding?: boolean;
    fixedPosition?: boolean;
    fieldFilter?: Function;
    forceExport?: boolean;
    suppressExport?: boolean;
    filters?: Filters;
    hiddenFields?: Array<string>;
    exportOrder?: number;
    inventory?: boolean;
    presence?: boolean;
    answer?: Array<any>;
    explanation?: string;
    explanationDocument?: any;
    linked?: boolean;
    slideIndex?: number;
    slideTitle?: string;
    deleteOnHidden?: boolean;
    isImage?: boolean;
    hideMobile?: boolean;
    isImageRecognition?: boolean;
    handler?: (value, controls, data, form?, requestor?, dialog?, viewContainerRef?, changeDetectorRef?) => void;
    color?: string;
    size?: number;
    roles?: Array<string>;
    disabledInvalid?: boolean;
    fixAutofill?: boolean;
    document?: any;
    image?: any;
    images?: any;
    allowOpenDetails?: boolean;
    advanced?: boolean;
    saveGeoloc?: boolean;
    allPhotosRequired?: boolean;

    valuesColor?: Array<{ key: string; value: string }>;
    valuesType?: Array<{ key: string; value: string }>;

    language?: string;
    extraButton?: { title: string; buttons: Array<{ text: string; handler?: Function; }> };

    sentence?: string;
    leftValues?: Array<string>;
    rightValues?: Array<string>;

    correctValues?: Array<string>;
    wrongValues?: Array<string>;

    searchable?: boolean;
    filterByLocation?: boolean;
    url?: string;

    userTags?: Array<string>;
    imageLayout?: string;

    reportOrder?: number;
    allowTask?: boolean;

    disableAutocomplete?: boolean;
    formula?: string;

    forceModal?: boolean;
    pageSize?: number;

    shareToFeed?: boolean;
}

export class FormFieldType {
    static audio: string = 'audio';
    static autocomplete: string = 'autocomplete';
    static barcode: string = 'barcode';
    static checkbox: string = 'checkbox';
    static date: string = 'date';
    static time: string = 'time';
    static datetime: string = 'datetime-local';
    static document: string = 'document';
    static documentuploader: string = 'documentuploader';
    static email: string = 'email';
    static emailreport: string = 'emailreport';
    static information: string = 'information';
    static image: string = 'image';
    static json: string = 'json';
    static number: string = 'number';
    static missionfield: string = 'missionfield';
    static missionscore: string = 'missionscore';
    static password: string = 'password';
    static photo: string = 'photo';
    static multiphotos: string = 'multiphotos';
    static range: string = 'range';
    static ranking: string = 'ranking';
    static select: string = 'select';
    static selectimage: string = 'selectimage';
    static selectmulti: string = 'selectmulti';
    static selectbuttons: string = 'selectbuttons';
    static selectbuttonsmulti: string = 'selectbuttonsmulti';
    static selectchat: string = 'selectchat';
    static swipeselect: string = 'swipeselect';
    static signature: string = 'signature';
    static starrating: string = 'starrating';
    static tel: string = 'tel';
    static text: string = 'text';
    static textarea: string = 'textarea';
    static toggle: string = 'toggle';
    static video: string = 'video';
    static grid: string = 'grid';
    static daterange: string = 'daterange';
    static filter: string = 'filter';
    static betweennumber: string = 'between-number';
    static betweendate: string = 'between-date';
    static betweendatetime: string = 'between-datetime';
    static betweentime: string = 'between-time';
    static timer: string = 'timer';
    static location: string = 'location';
    static catalog: string = 'catalog';
    static todo: string = 'todo';
    static button: string = 'button';
    static stripecard: string = 'stripecard';
    static invite: string = 'invite';
    static inttel: string = 'inttel';
    static color: string = 'color';
    static productcheck: string = 'productcheck';
    static missingword: string = 'missingword';
    static knob: string = 'knob';
    static connect: string = 'connect';
    static videoplayer: string = 'videoplayer';
    static game: string = 'game';
    static checklist: string = 'checklist';
    static task: string = 'task';
    static formula: string = 'formula';
    static schedule: string = 'schedule';
    static address: string = 'address';

}

export const MOBILE_FORM_FIELDS = [
    { title: 'INFORMATION', type: FormFieldType.information, icon: 'yo-environment-sign' },
    { title: 'IMAGE', type: FormFieldType.image, icon: 'yo-image' },

    { title: 'PHOTO', type: FormFieldType.photo, icon: 'yo-camera' },
    { title: 'MULTIPHOTOS', type: FormFieldType.multiphotos, icon: 'yo-gallery' },

    { title: 'COMBOBUTTONS', type: FormFieldType.selectbuttons, icon: 'yo-selectbuttons' },
    { title: 'COMBOMULTIBUTTONS', type: FormFieldType.selectbuttonsmulti, icon: 'yo-selectbuttonsmulti' },

    { title: 'COMBO', type: FormFieldType.select, icon: 'yo-circle' },
    { title: 'COMBOMULTI', type: FormFieldType.selectmulti, icon: 'yo-check-circle' },

    { title: 'SHORTTEXT', type: FormFieldType.text, icon: 'yo-shorttext' },
    { title: 'LONGTEXT', type: FormFieldType.textarea, icon: 'yo-longtext' },

    { title: 'NUMBER', type: FormFieldType.number, icon: 'yo-number' },
    { title: 'STARRATING', type: FormFieldType.starrating, icon: 'yo-star' },

    { title: 'DATE', type: FormFieldType.date, icon: 'yo-week' },
    { title: 'TIME', type: FormFieldType.time, icon: 'yo-time' },

    { title: 'SIGNATURE', type: FormFieldType.signature, icon: 'yo-signature' },
    { title: 'EMAILREPORT', type: FormFieldType.emailreport, icon: 'yo-enveloppe' },

    { title: 'TODO', type: FormFieldType.todo, icon: 'yo-clipboard' },
    { title: 'TASK', type: FormFieldType.task, icon: 'yo-penform' },

    { title: 'CHECKLIST', type: FormFieldType.checklist, icon: 'yo-todo' }
];

export const MOBILE_FORM_FIELDS_ADVANCED = [
    { title: 'VIDEO', type: FormFieldType.video, icon: 'yo-video' },
    { title: 'AUDIO', type: FormFieldType.audio, icon: 'yo-audio' },

    { title: 'DOCUMENT', type: FormFieldType.document, icon: 'yo-file' },
    { title: 'VIDEOPLAYER', type: FormFieldType.videoplayer, icon: 'yo-svg-play' },

    { title: 'BARCODE', type: FormFieldType.barcode, icon: 'yo-barcode' },
    { title: 'CATALOG', type: FormFieldType.catalog, icon: 'yo-shoppingcart' },

    { title: 'SELECTIMAGE', type: FormFieldType.selectimage, icon: 'yo-gallery' },
    { title: 'AUTOCOMPLETE', type: FormFieldType.autocomplete, icon: 'yo-magic' },

    { title: 'CHECKBOX', type: FormFieldType.checkbox, icon: 'yo-check-square' },
    { title: 'TOOGLE', type: FormFieldType.toggle, icon: 'yo-toggle' },

    { title: 'TEL', type: FormFieldType.tel, icon: 'yo-phone' },
    { title: 'EMAIL', type: FormFieldType.email, icon: 'yo-mail' },

    { title: 'RANKING', type: FormFieldType.ranking, icon: 'yo-list' },
    { title: 'RANGE', type: FormFieldType.range, icon: 'yo-sliders' },

    { title: 'ADDRESS', type: FormFieldType.address, icon: 'yo-map-marker' },
    { title: 'LOCATION', type: FormFieldType.location, icon: 'yo-store' },

    { title: 'DATETIME', type: FormFieldType.datetime, icon: 'yo-calendar' },
    { title: 'TIMER', type: FormFieldType.timer, icon: 'yo-time' },

    { title: 'FORMULA', type: FormFieldType.formula, icon: 'yo-filter' }

];

export const MOBILE_FORM_FIELDS_YOOASK = [
    { title: 'INFORMATION', type: FormFieldType.information, icon: 'yo-environment-sign' },
    { title: 'IMAGE', type: FormFieldType.image, icon: 'yo-image' },

    { title: 'DOCUMENT', type: FormFieldType.document, icon: 'yo-file' },
    { title: 'VIDEOPLAYER', type: FormFieldType.videoplayer, icon: 'yo-svg-play' }
];

export const MOBILE_FORM_FIELDS_YOOASKPLUS = [
    { title: 'INFORMATION', type: FormFieldType.information, icon: 'yo-environment-sign' },
    { title: 'IMAGE', type: FormFieldType.image, icon: 'yo-image' },

    { title: 'DOCUMENT', type: FormFieldType.document, icon: 'yo-file' },
    { title: 'VIDEOPLAYER', type: FormFieldType.videoplayer, icon: 'yo-svg-play' },

    { title: 'COMBOBUTTONS', type: FormFieldType.selectbuttons, icon: 'yo-selectbuttons' },
    { title: 'COMBO', type: FormFieldType.select, icon: 'yo-circle' },

    { title: 'COMBOMULTIBUTTONS', type: FormFieldType.selectbuttonsmulti, icon: 'yo-selectbuttonsmulti' },
    { title: 'COMBOMULTI', type: FormFieldType.selectmulti, icon: 'yo-check-circle' },

    { title: 'CHAT', type: FormFieldType.selectchat, icon: 'yo-chat' },
    { title: 'RANKING', type: FormFieldType.ranking, icon: 'yo-list' },

    { title: 'SELECTIMAGE', type: FormFieldType.selectimage, icon: 'yo-gallery' },
    { title: 'STARRATING', type: FormFieldType.starrating, icon: 'yo-star' },

    { title: 'NUMBER', type: FormFieldType.number, icon: 'yo-number' },
    { title: 'RANGE', type: FormFieldType.range, icon: 'yo-sliders' },

    { title: 'CHECKBOX', type: FormFieldType.checkbox, icon: 'yo-check-square' },
    { title: 'TOOGLE', type: FormFieldType.toggle, icon: 'yo-toggle' },

    { title: 'MISSINGWORD', type: FormFieldType.missingword, icon: 'yo-feed' },
    { title: 'KNOB', type: FormFieldType.knob, icon: 'yo-time-timesheet' },

    { title: 'SWIPESELECT', type: FormFieldType.swipeselect, icon: 'yo-signature' },
    { title: 'CONNECT', type: FormFieldType.connect, icon: 'yo-card' },

    { title: 'GAME', type: FormFieldType.game, icon: 'yo-gameboy' }
];

export const MOBILE_FORM_FIELDS_YOOGENERATOR = [
    { title: 'SHORTTEXT', type: FormFieldType.text, icon: 'yo-shorttext' },
    { title: 'LONGTEXT', type: FormFieldType.textarea, icon: 'yo-longtext' },
    { title: 'PHOTO', type: FormFieldType.photo, icon: 'yo-camera' },
    { title: 'COMBOBUTTONS', type: FormFieldType.selectbuttons, icon: 'yo-selectbuttons' },
    { title: 'COMBO', type: FormFieldType.select, icon: 'yo-circle' },
    { title: 'COMBOMULTIBUTTONS', type: FormFieldType.selectbuttonsmulti, icon: 'yo-selectbuttonsmulti' },
    { title: 'COMBOMULTI', type: FormFieldType.selectmulti, icon: 'yo-check-circle' },
    { title: 'STARRATING', type: FormFieldType.starrating, icon: 'yo-star' },
    { title: 'NUMBER', type: FormFieldType.number, icon: 'yo-number' },
    { title: 'RANGE', type: FormFieldType.range, icon: 'yo-sliders' },
    { title: 'CHECKBOX', type: FormFieldType.checkbox, icon: 'yo-check-square' },
    { title: 'TOOGLE', type: FormFieldType.toggle, icon: 'yo-toggle' },
    { title: 'TEL', type: FormFieldType.tel, icon: 'yo-phone' },
    { title: 'EMAIL', type: FormFieldType.email, icon: 'yo-mail' },
    { title: 'ADDRESS', type: FormFieldType.address, icon: 'yo-map-marker' },
    { title: 'LOCATION', type: FormFieldType.location, icon: 'yo-store' },
    { title: 'SIGNATURE', type: FormFieldType.signature, icon: 'yo-signature' },
    { title: 'DATE', type: FormFieldType.date, icon: 'yo-week' },
    { title: 'TIME', type: FormFieldType.time, icon: 'yo-time' },
    { title: 'DATETIME', type: FormFieldType.datetime, icon: 'yo-calendar' },
    { title: 'CATALOG', type: FormFieldType.catalog, icon: 'yo-shoppingcart' }
];

export const MOBILE_FORM_FIELDS_ALL = uniqBy(MOBILE_FORM_FIELDS.concat(MOBILE_FORM_FIELDS_ADVANCED).concat(MOBILE_FORM_FIELDS_YOOASK), 'title');

export const ICON_LIST = ['filter',
    'undo',
    'palette',
    'play',
    'airplane',
    'rocket',
    'paperplane',
    'workplace',
    'barcode2',
    'like',
    'study',
    'galleryslide',
    'eraser',
    'servers',
    'cloudmessage',
    'time-history',
    'time-timesheet',
    'time-overview',
    'time-menu',
    'diamond',
    'walk',
    'euro',
    'pound',
    'tag',
    'cash',
    'credit-card',
    'basket',
    'store',
    'chevron2-right',
    'chevron2-left',
    'settings',
    'support',
    'video',
    'imac',
    'mobile',
    'save',
    'camera2',
    'camera',
    'redo',
    'undo',
    'draw',
    'trash',
    'edit',
    'sort-asc',
    'sort-desc',
    'feed',
    'key',
    'password',
    'locked',
    'profile',
    'people',
    'user',
    'notification',
    'plane',
    'cog',
    'config',
    'share',
    'code',
    'flag',
    'danger',
    'import',
    'upload',
    'chart-bar',
    'geoloc',
    'list2',
    'tabs',
    'grid',
    'check-square',
    'menu',
    'card',
    'refresh',
    'refresh-a',
    'logout',
    'eye',
    'move',
    'collapse',
    'expand',
    'chevron-bottom',
    'chevron-right',
    'chevron-top',
    'chevron-left',
    'circles',
    'locate-me',
    'circle',
    'check',
    'close',
    'minus',
    'plus',
    'more',
    'bell',
    'google',
    'chart-gauge',
    'check-circle',
    'close-circle',
    'circle-minus',
    'chevron-right-circle',
    'down-arrow',
    'right-arrow',
    'up-arrow',
    'left-arrow',
    'export',
    'medal',
    'filter',
    'degree',
    'trophee',
    'tetris',
    'bicycle',
    'car',
    'building',
    'week',
    'dashboard',
    'alarmclock',
    'wait',
    'time',
    'calendar',
    'info',
    'map',
    'map-marker2',
    'map-marker',
    'signature',
    'male',
    'female',
    'smiley',
    'photo2',
    'videocall',
    'briefcase',
    'document',
    'clipboard',
    'editform',
    'overview',
    'chart-pie',
    'mission-list',
    'archive',
    'folder',
    'learn',
    'file',
    'documents',
    'mission',
    'feed2',
    'gallery',
    'phone',
    'audio',
    'enveloppe',
    'mail',
    'question',
    'chat',
    'comment',
    'paypal',
    'two-files',
    'doc-folder-a',
    'doc-folder-cross-a',
    'doc-folder-plus-a',
    'list',
    'photo',
    'image',
    'barcode3',
    'ecommerce-creditcard-b',
    'shoppingcart',
    'longtext',
    'shorttext',
    'environment-sign',
    'fire',
    'toggle',
    'sliders',
    'tovalidate',
    'security',
    'compass',
    'magic',
    'world',
    'notallowed',
    'check-minus',
    'check-plus',
    'check-tick',
    'circle-plus',
    'check-empty',
    'number',
    'star3',
    'selectbuttons',
    'selectbuttonsmulti',
    'missions',
    'polls',
    'services',
    'todos',
    'deploy',
    'more-full',
    'question-add',
    'filter-active',
    'more-v',
    'eye-01',
    'eye-full',
    'yoobic-line',
    'yoobic',
    'star-full',
    'star',
    'file-pdf',
    'file-word',
    'file-excel',
    'file-powerpoint',
    'target',
    'barcode',
    'coin'
];