import { Component, Element, Prop, State, Event, EventEmitter, Method } from '@stencil/core';
import { hasValue, isVisible, isReadonly, setFieldData, updateFormulas, getFieldValue } from '../../../utils/helpers/form-helpers';
import { showModal } from '../../../utils/helpers/helpers';
//import { YooFormDynamicModalComponent } from './form-dynamic-dialog';
import { services } from '../../../services';

const TABBAR_HEIGHT = 52;
const KEYBOARD_TOP_PADDING = 100;

@Component({
    tag: 'yoo-form-dynamic',
    styleUrl: 'form-dynamic.scss',
    scoped: true
})
export class YooFormDynamicComponent {

    @Prop() slides: Array<any>;
    @Prop() data: Object;
    @Prop() showTabs: boolean;
    @Prop() showRecap: boolean;
    @Prop() suffix: string;
    @Prop() forceReadonly: boolean;
    @Prop() showSave: boolean;

    @Element() host: HTMLStencilElement;

    @State() currentData: Object;
    @State() fieldsState: { [key: string]: { validity?: boolean; visible?: boolean; zoomed?: boolean; readonly?: boolean } };
    @State() slidesState: Array<{ validity?: boolean; visible?: boolean; zoomed?: boolean; hasValue?: boolean }>;
    @State() activeIndex: number = 0;
    @State() progress: number = 0;
    @State() validity: boolean = false;

    @Event() dataChanged: EventEmitter<any>;
    @Event() save: EventEmitter<any>;
    @Event() fieldFetchData: EventEmitter<any>;

    protected slidesOptions;

    private ionSlides: HTMLIonSlidesElement;
    private currentScrollPositions: number[];
    private fullWindowHeight: number;
    private inputBottomYPosition: number;

    constructor() {
        this.slidesOptions = {
            //slidesPerView: 1.1,
            //centeredSlides: true,
            noSwipingSelector: 'input',
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            }
        };
    }

    onIonScroll(event: CustomEvent) {
        this.currentScrollPositions[this.activeIndex] = event.detail.currentY;
    }

    componentWillLoad() {
        this.currentData = this.data || {};
        this.fieldsState = {};
        this.slidesState = new Array(this.slides ? this.slides.length : 0);
        this.updateState();
    }

    componentDidLoad() {
        this.ionSlides = this.host.querySelector('ion-slides');
        let slideLength = this.slides ? this.slides.length + 1 : 0;
        this.currentScrollPositions = new Array(slideLength).fill(0);
        if (services.coreConfig.isIonic()) {
            this.fullWindowHeight = window.innerHeight;
            window.addEventListener('resize', () => this.onKeyboardChange());
        }
        if (!this.showTabs) {
            setTimeout(() => {
                if (this.ionSlides) {
                    (this.ionSlides as any).lockSwipes(true);
                }
            }, 300);
        }
    }

    getFieldState(field: any) {
        return this.fieldsState[field.name] || {};
    }

    setFieldState(field: any, state) {
        this.fieldsState[field.name] = state;
    }

    getSlideState(slideIndex: number) {
        return this.slidesState[slideIndex] || {};
    }

    onFieldChanged(event: CustomEvent, field: any) {
        console.log('field data changed being recieved');
        setFieldData(field, event.detail, this.currentData, this.suffix);
        if (field.allowTime) {
            setFieldData(field, new Date(), this.currentData, '.time');
        }
        this.updateState();
        this.dataChanged.emit(this.currentData);
    }

    onFieldCommented(event: CustomEvent, field: any) {
        setFieldData(field, event.detail, this.currentData, '.comments');
        let el = this.host.querySelector('[attr-name=f-' + field.name + ']');
        if (el) {
            let container = el.closest('yoo-form-input-container') as HTMLYooFormInputContainerElement;
            container.comments = event.detail;
        }
        this.dataChanged.emit(this.currentData);
    }

    onFieldValidityChanged(event: CustomEvent, field: any, slideIndex: number) {
        this.fieldsState = this.fieldsState || {};
        this.fieldsState[field.name] = this.fieldsState[field.name] || {};
        this.fieldsState[field.name].validity = event.detail;
        this.fieldsState = { ...this.fieldsState };
        this.updateState();
    }

    onFieldFocused(inputIndex: number) {
        console.log('field focused being recieved');
        if (services.coreConfig.isCordova()) {
            let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
            let inputDimensions = currentSlide.querySelectorAll('yoo-form-input-container')[inputIndex].getBoundingClientRect();
            this.inputBottomYPosition = inputDimensions.top + inputDimensions.height;
            this.onKeyboardChange();
        }
    }

    onSave(ev: MouseEvent) {
        ev.stopPropagation();
        this.save.emit(this.currentData);
    }

    onIonSlideDidChange(ev: CustomEvent) {
        this.activeIndex = ev.detail.activeIndex;
        this.blurInput();
    }

    @Method()
    goToRecap() {
        if (this.ionSlides) {
            this.ionSlides.slideTo(0);
        }
    }

    @Method()
    forceFieldUpdate(field: any) {
        let el = this.host.querySelector('[attr-name=f-' + field.name + ']') as any;
        if (el) {
            switch (field.type) {
                case FormFieldType.autocomplete:
                    let auto = (el as any);
                    auto.values = field.values;
                    auto.updateDialogValues(field.values);
                    break;
            }
        }
    }

    @Method()
    isValid() {
        return this.validity;
    }

    @Method()
    scrollToPoint(scrollDistance: number) {
        let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
        let ionScroll = currentSlide.querySelector('ion-scroll') as HTMLIonScrollElement;
        ionScroll.scrollToPoint(0, (this.currentScrollPositions[this.activeIndex] + scrollDistance), 0);
    }

    blurInput() {
        let activeElement = document.activeElement as HTMLElement;
        if (activeElement) { activeElement.blur(); }
    }

    goToSlide(index) {
        if (this.ionSlides) {
            this.ionSlides.slideTo(this.showRecap !== false ? index + 1 : index);
        }
    }

    onSlidePrevious() {
        if (this.ionSlides) {
            this.ionSlides.slidePrev();
        }
    }

    onSlideNext() {
        if (this.ionSlides) {
            this.ionSlides.slideNext();
        }
    }

    isFirstSlide() {
        return this.activeIndex === 0;
    }

    slideHasAdvancedFields(slide: any) {
        return slide.items.some((field) => {
            return field.advanced && this.getFieldState(field).visible !== false;
        });
    }

    onToggleSlideZoom(slideIndex: number) {
        let state = this.getSlideState(slideIndex);
        state.zoomed = state.zoomed ? false : true;
        this.slidesState = [...this.slidesState];

        let content = this.host.closest('ion-content');
        if (content && state.zoomed) {
            content.classList.add('absolute');
            if (this.ionSlides) {
                (this.ionSlides as any).lockSwipes(true);
            }
        } else if (content && !state.zoomed) {
            content.classList.remove('absolute');
            if (this.ionSlides) {
                (this.ionSlides as any).lockSwipes(false);
            }
        }
        // let slides = this.host.querySelector('ion-slides');
    }

    onShowAdvancedFields(slide: any) {
        let fields = slide.items.filter(field => field.advanced && this.getFieldState(field).visible !== false);
        if (fields.length > 0) {
            fields = fields.map(field => {
                let retVal = { ...field };
                retVal.advanced = false;
                return retVal;
            });
            let slides = [{ items: fields, title: ('ADVANCED') }];
            let form = document.createElement('yoo-form-dynamic-dialog');
            form.slides = slides;
            form.showTabs = false;
            form.showRecap = false;
            form.forceReadonly = this.forceReadonly;
            form.data = this.currentData;
            showModal(form).then(ret => {
                if (ret && ret.data) {
                    this.currentData = ret.data;
                    window['console'].log(this.currentData);
                }
            });
        }
    }

    fieldHasValue(field: any) {
        return hasValue(field, this.currentData, this.suffix);
    }

    updateState() {
        this.progress = 0;
        let total = 0;
        let filed = 0;
        updateFormulas(this.slides, this.currentData, this.suffix);
        (this.slides || []).forEach((slide, i) => {
            let isValid = true;
            let slideHasValue = false;
            (slide.items || []).forEach(field => {
                if (!field.advanced) {
                    if (field.readonly || field.type === FormFieldType.information) {
                    } else {
                        total += 1;
                        if (this.fieldHasValue(field)) {
                            filed += 1;
                        }
                    }
                    let fieldState = this.getFieldState(field);
                    fieldState.readonly = isReadonly(field, this.currentData, this.suffix);
                    fieldState.visible = isVisible(field, fieldState.readonly, this.currentData, this.suffix);
                    this.setFieldState(field, fieldState);

                    isValid = isValid && (field.required ? fieldState.validity === true : fieldState.validity !== false);
                    slideHasValue = slideHasValue || this.fieldHasValue(field);
                    this.slidesState[i] = this.slidesState[i] || {};
                    this.slidesState[i].hasValue = slideHasValue;
                    this.slidesState[i].validity = slideHasValue ? isValid : null;
                }
            });
        });
        this.progress = filed / total * 100;
        this.slidesState = [...this.slidesState];
        this.fieldsState = { ...this.fieldsState };
        this.validity = this.slidesState.every(state => state.validity);
    }

    getInputType(field: any) {
        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
                return field.type;
        }
        return FormFieldType.text;
    }

    onKeyboardChange() {
        let windowHeightWithKeyboard = window.innerHeight;
        if (windowHeightWithKeyboard < this.fullWindowHeight) {
            let maximumYPosition = windowHeightWithKeyboard - TABBAR_HEIGHT - KEYBOARD_TOP_PADDING;
            let scrollDistance = this.inputBottomYPosition > maximumYPosition ? (this.inputBottomYPosition - maximumYPosition) : 0;
            this.scrollToPoint(scrollDistance);
        }
    }

    onFetchData(field: any, ev: CustomEvent) {
        ev.stopPropagation();
        this.fieldFetchData.emit({ field, search: ev.detail });
    }

    renderHeader() {
        return null;
    }

    renderRecap() {
        return this.showRecap !== false ?
            <ion-slide class="recap">
                <ion-scroll forceOverscroll={false}>
                    <div class="header">
                        <yoo-progress-bar percentage={true} progress={this.progress} class="success"></yoo-progress-bar>
                    </div>
                    <div attr-flex attr-layout="column">
                        {this.slides.map((s, slideIndex) =>
                            <yoo-form-recap-step onClick={() => this.goToSlide(slideIndex)} stepNumber={slideIndex + 1} mainTitle={s.title} subTitle={s.description} validity={this.getSlideState(slideIndex).validity} ></yoo-form-recap-step>
                        )}
                    </div>
                </ion-scroll>
                <div class="footer" attr-layout="row" attr-layout-align="center center">
                    <yoo-button onClick={() => this.onSlideNext()} text={('START')} class="large gradient-success"></yoo-button>
                </div>
            </ion-slide> : null;
    }

    renderSlideHeader(slide: any, slideIndex: number) {
        return this.showTabs ? <div attr-layout="row" class={'header ' + (this.getSlideState(slideIndex).validity ? 'success' : '')}>
            {this.activeIndex > 0 ? <i class="yo-left" onClick={() => this.onSlidePrevious()}></i> : null}
            <div class="title" attr-flex>{(slide.title)}</div>
            {this.activeIndex < (this.slides.length - 1 + (this.showRecap ? 1 : 0)) ? <i class="yo-right" onClick={() => this.onSlideNext()}></i> : null}
        </div> : null;
    }

    renderZoomButton(slideIndex: number) {
        return this.showTabs ? <div class="zoom-button-container" attr-layout="row">
            <div attr-flex></div>
            <div class="zoom-button" onClick={() => this.onToggleSlideZoom(slideIndex)}><i class={this.getSlideState(slideIndex).zoomed ? 'yo-close' : 'yo-maximize'}></i></div>
        </div> : null;
    }

    renderBody() {
        if (this.slides && this.slides.length > 0) {
            return (
                <ion-slides pager={false} options={this.slidesOptions} onIonSlideDidChange={ev => this.onIonSlideDidChange(ev)} >
                    {this.renderRecap()}
                    {this.slides.map((slide, slideIndex) =>
                        <ion-slide class={(this.showTabs ? 'dynamic ' : '') + (this.getSlideState(slideIndex).zoomed ? 'zoomed ' : '')} attr-layout="column">
                            {this.renderSlideHeader(slide, slideIndex)}
                            <div class={(this.showTabs ? 'slide-container ' : 'slide-container no-shadow')} attr-flex>
                                <ion-scroll forceOverscroll={false} scrollEvents={true} onIonScroll={(event) => this.onIonScroll(event)}>
                                    {this.renderZoomButton(slideIndex)}
                                    {slideIndex === 0 ? <slot></slot> : null}
                                    {
                                        slide.items.map((field, inputIndex) => {
                                            let readonly = this.getFieldState(field).readonly || this.forceReadonly;
                                            let comments = getFieldValue(field, this.currentData, '.comments');
                                            return this.getFieldState(field).visible !== false && !field.advanced ?
                                                <yoo-form-input-container
                                                    class={'animated slideInLeft delay-' + inputIndex}
                                                    field={field}
                                                    readonly={readonly}
                                                    comments={comments}
                                                    onCommented={ev => this.onFieldCommented(ev, field)}
                                                >
                                                    {this.renderInput(field, slideIndex, inputIndex, readonly)}
                                                </yoo-form-input-container> : null;
                                        })
                                    }
                                    {this.slideHasAdvancedFields(slide) ? <div class="toolbar-spacer"></div> : null}
                                    {slideIndex === this.slides.length - 1 && this.isValid() ? <div class="footer-spacer"></div> : null}
                                </ion-scroll>
                                {this.slideHasAdvancedFields(slide) ?
                                    <div class="toolbar">
                                        <i class="yo-settings" onClick={(ev) => this.onShowAdvancedFields(slide)}></i>
                                    </div>
                                    : null}
                                {this.showSave && (slideIndex === this.slides.length - 1) && this.isValid() ?
                                    <div class="footer animated slideInUp" attr-layout="row" attr-layout-align="center center">
                                        <yoo-button onClick={(ev) => this.onSave(ev)} text={('SAVE')} class="large gradient-success"></yoo-button>
                                    </div>
                                    : null}
                            </div>
                        </ion-slide>
                    )}
                </ion-slides>
            );
        }
        return null;
    }

    renderInput(field: any, slideIndex: number, inputIndex: number, readonly: boolean) {
        let validators = field.required ? [{ name: 'required' }] : null;
        let value = getFieldValue(field, this.currentData, this.suffix);
        let TagType = 'yoo-form-input';

        let attrs = {
            value: value,
            readonly: readonly,
            validators: validators,
            onInputChanged: (event) => this.onFieldChanged(event, field),
            onValidityChanged: (event) => this.onFieldValidityChanged(event, field, slideIndex),
            onInputFocused: () => this.onFieldFocused(inputIndex)
        };

        let extraAttrs = {};

        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
                TagType = 'yoo-form-input';
                extraAttrs = {
                    min: field.min,
                    max: field.max,
                    type: this.getInputType(field)
                };
                break;

            case FormFieldType.date:
            case FormFieldType.datetime:
            case FormFieldType.time:
                TagType = 'yoo-form-date-time';
                extraAttrs = {
                    minDate: field.minDate,
                    maxDate: field.maxDate,
                    type: field.type
                };
                break;

            case FormFieldType.toggle:
                TagType = 'yoo-form-toggle';
                extraAttrs = {
                    type: 'line'
                };
                break;

            case FormFieldType.checkbox:
                TagType = 'yoo-form-checkbox';
                extraAttrs = {
                    type: 'line'
                };
                break;

            case FormFieldType.range:
                TagType = 'yoo-form-range';
                extraAttrs = {
                    min: field.min,
                    max: field.max,
                    type: this.getInputType(field),
                    double: false
                };
                break;
            case FormFieldType.autocomplete:
                TagType = 'yoo-form-autocomplete';
                extraAttrs = {
                    multiple: field.multiple,
                    useTranslate: field.translate,
                    entityType: field.collectionName as any, values: field.values,
                    onFetchData: (ev) => this.onFetchData(field, ev)
                };
                break;

            case FormFieldType.textarea:
                TagType = 'yoo-form-text-area';
                break;

            case FormFieldType.starrating:
                TagType = 'yoo-form-star-rating';
                extraAttrs = {
                    class: 'success'
                };
                break;

            case FormFieldType.signature:
                TagType = 'yoo-form-signature-pad';
                break;

            case FormFieldType.select:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.selectmulti:
                TagType = 'yoo-form-button-choice';
                extraAttrs = {
                    values: field.values
                };
                break;

            case FormFieldType.photo:
            case FormFieldType.multiphotos:
                TagType = 'yoo-form-photo';
                extraAttrs = {
                    type: field.type === FormFieldType.video ? 'video' : field.type === FormFieldType.audio ? 'audio' : 'photo',
                    maxWidth: field.maxWidth,
                    saveGeoloc: field.saveGeoloc,
                    multiple: field.type === FormFieldType.multiphotos,
                    min: field.minPhotos,
                    max: field.maxPhotos,
                    duration: field.duration
                };
                break;

            case FormFieldType.document:
            case FormFieldType.image:
                TagType = 'yoo-form-document';
                extraAttrs = {
                    type: field.type === FormFieldType.document ? 'document' : 'image',
                    document: field.document
                };
                break;

            case FormFieldType.formula:
                TagType = 'yoo-form-formula';
                break;

            default:
                return <div class="font-small danger" > FormFieldType.{field.type} is not supported</div>;
        }

        return <TagType {...attrs} {...extraAttrs} attr-name={'f-' + field.name} > </TagType>;
    }

    renderFooter() {
        return null;
    }

    render(): JSX.Element {
        return (
            <form>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </form>
        );
    }
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
