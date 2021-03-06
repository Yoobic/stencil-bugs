/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  AsyncValidator,
  Validator,
  ValidatorEntry,
} from './utils/helpers/form-input-helpers';

declare global {

  namespace StencilComponents {
    interface YooFormDynamicDialog {
      'data': Object;
      'forceReadonly': boolean;
      'isValid': () => boolean;
      'showRecap': boolean;
      'showTabs': boolean;
      'slides': Array<any>;
      'suffix': string;
    }
  }

  interface HTMLYooFormDynamicDialogElement extends StencilComponents.YooFormDynamicDialog, HTMLStencilElement {}

  var HTMLYooFormDynamicDialogElement: {
    prototype: HTMLYooFormDynamicDialogElement;
    new (): HTMLYooFormDynamicDialogElement;
  };
  interface HTMLElementTagNameMap {
    'yoo-form-dynamic-dialog': HTMLYooFormDynamicDialogElement;
  }
  interface ElementTagNameMap {
    'yoo-form-dynamic-dialog': HTMLYooFormDynamicDialogElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'yoo-form-dynamic-dialog': JSXElements.YooFormDynamicDialogAttributes;
    }
  }
  namespace JSXElements {
    export interface YooFormDynamicDialogAttributes extends HTMLAttributes {
      'data'?: Object;
      'forceReadonly'?: boolean;
      'showRecap'?: boolean;
      'showTabs'?: boolean;
      'slides'?: Array<any>;
      'suffix'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface YooFormDynamic {
      'data': Object;
      'forceFieldUpdate': (field: any) => void;
      'forceReadonly': boolean;
      'goToRecap': () => void;
      'isValid': () => boolean;
      'scrollToPoint': (scrollDistance: number) => void;
      'showRecap': boolean;
      'showSave': boolean;
      'showTabs': boolean;
      'slides': Array<any>;
      'suffix': string;
    }
  }

  interface HTMLYooFormDynamicElement extends StencilComponents.YooFormDynamic, HTMLStencilElement {}

  var HTMLYooFormDynamicElement: {
    prototype: HTMLYooFormDynamicElement;
    new (): HTMLYooFormDynamicElement;
  };
  interface HTMLElementTagNameMap {
    'yoo-form-dynamic': HTMLYooFormDynamicElement;
  }
  interface ElementTagNameMap {
    'yoo-form-dynamic': HTMLYooFormDynamicElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'yoo-form-dynamic': JSXElements.YooFormDynamicAttributes;
    }
  }
  namespace JSXElements {
    export interface YooFormDynamicAttributes extends HTMLAttributes {
      'data'?: Object;
      'forceReadonly'?: boolean;
      'onDataChanged'?: (event: CustomEvent<any>) => void;
      'onFieldFetchData'?: (event: CustomEvent<any>) => void;
      'onSave'?: (event: CustomEvent<any>) => void;
      'showRecap'?: boolean;
      'showSave'?: boolean;
      'showTabs'?: boolean;
      'slides'?: Array<any>;
      'suffix'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface YooFormInputContainer {
      'comments': string;
      'field': any;
      'readonly': boolean;
    }
  }

  interface HTMLYooFormInputContainerElement extends StencilComponents.YooFormInputContainer, HTMLStencilElement {}

  var HTMLYooFormInputContainerElement: {
    prototype: HTMLYooFormInputContainerElement;
    new (): HTMLYooFormInputContainerElement;
  };
  interface HTMLElementTagNameMap {
    'yoo-form-input-container': HTMLYooFormInputContainerElement;
  }
  interface ElementTagNameMap {
    'yoo-form-input-container': HTMLYooFormInputContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'yoo-form-input-container': JSXElements.YooFormInputContainerAttributes;
    }
  }
  namespace JSXElements {
    export interface YooFormInputContainerAttributes extends HTMLAttributes {
      'comments'?: string;
      'field'?: any;
      'onCommented'?: (event: CustomEvent<string>) => void;
      'readonly'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface YooFormInput {
      'asyncValidators': Array<AsyncValidator<string>>;
      'iconPrefix': string;
      'iconSuffix': string;
      'isValid': () => boolean;
      'max': any;
      'min': any;
      'placeholder': string;
      'placeholdertolabel': boolean;
      'readonly': boolean;
      'required': boolean;
      'showInputClear': boolean;
      'showPasswordToggle': boolean;
      'tooltip': string;
      'type': string;
      'validators': Array<Validator<string> | ValidatorEntry>;
      'value': string | number;
    }
  }

  interface HTMLYooFormInputElement extends StencilComponents.YooFormInput, HTMLStencilElement {}

  var HTMLYooFormInputElement: {
    prototype: HTMLYooFormInputElement;
    new (): HTMLYooFormInputElement;
  };
  interface HTMLElementTagNameMap {
    'yoo-form-input': HTMLYooFormInputElement;
  }
  interface ElementTagNameMap {
    'yoo-form-input': HTMLYooFormInputElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'yoo-form-input': JSXElements.YooFormInputAttributes;
    }
  }
  namespace JSXElements {
    export interface YooFormInputAttributes extends HTMLAttributes {
      'asyncValidators'?: Array<AsyncValidator<string>>;
      'iconPrefix'?: string;
      'iconSuffix'?: string;
      'max'?: any;
      'min'?: any;
      'onEnterPressed'?: (event: CustomEvent<boolean>) => void;
      'onIconClicked'?: (event: CustomEvent<string>) => void;
      'onInputBlurred'?: (event: CustomEvent<any>) => void;
      'onInputChanged'?: (event: CustomEvent<any>) => void;
      'onInputFocused'?: (event: CustomEvent<boolean>) => void;
      'onValidityChanged'?: (event: CustomEvent<boolean>) => void;
      'placeholder'?: string;
      'placeholdertolabel'?: boolean;
      'readonly'?: boolean;
      'required'?: boolean;
      'showInputClear'?: boolean;
      'showPasswordToggle'?: boolean;
      'tooltip'?: string;
      'type'?: string;
      'validators'?: Array<Validator<string> | ValidatorEntry>;
      'value'?: string | number;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;