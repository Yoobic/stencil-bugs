import { IFormField } from '../../entities/form-field/form-field.interface';
import { ISlide } from '../../entities/slide/slide.interface';

export interface IModalEntry {
    heading?: string;
    headingIcon?: string;
    hasHeader?: boolean;
    hasFooter?: boolean;
    footerText?: string;
    content?: HTMLElement;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    cssClass?: string;
    animationName?: string;
    animationProp?: any;
    primaryFn?: Function;
    withYooCtrl?: boolean;
    scrollEnabled?: boolean;
}

export interface IModalUpsertConfig {
    collectionName?: string | any;
    formDefinition?: Array<IFormField>;
    slides?: Array<ISlide>;
    suffix?: string;
    //extra options
    extraValidators?: Array<any>;
    extraButtons?: any;
    ignoreRequired?: boolean;
    readonly?: boolean;
    //text options
    title?: string;
    saveText?: string;
    cancelText?: string;
    allowEdit?: boolean;
    //visual options
    width?: string;
    height?: any;
    isFullscreen?: boolean;
    canMove?: boolean;
}