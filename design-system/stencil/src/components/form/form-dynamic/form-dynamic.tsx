import { Component, Element, Prop, State, Event, EventEmitter, Method } from '@stencil/core';
import { IFormField, ISlide, ITranslateService, FormFieldType, ICoreConfig, IFormSearch } from '@shared/interfaces';
import { hasValue, isVisible, isReadonly, setFieldData, updateFormulas, getFieldValue } from '../../../utils/helpers/form-helpers';
import { showModal } from '../../../utils/helpers/helpers';
//import { YooFormDynamicModalComponent } from './form-dynamic-dialog';

const TABBAR_HEIGHT = 52;
const KEYBOARD_TOP_PADDING = 100;

@Component({
    tag: 'yoo-form-dynamic',
    styleUrl: 'form-dynamic.scss',
    scoped: true
})
export class YooFormDynamicComponent {

    @Prop() slides: Array<ISlide>;
    @Prop() data: Object;
    @Prop() showTabs: boolean;
    @Prop() showRecap: boolean;
    @Prop() suffix: string;
    @Prop() forceReadonly: boolean;

    @Element() host: HTMLStencilElement;

    @State() currentData: Object;
    @State() fieldsState: { [key: string]: { validity?: boolean; visible?: boolean; zoomed?: boolean; readonly?: boolean } };
    @State() slidesState: Array<{ validity?: boolean; visible?: boolean; zoomed?: boolean; hasValue?: boolean }>;
    @State() activeIndex: number = 0;
    @State() progress: number = 0;
    @State() validity: boolean = false;

    @Event() dataChanged: EventEmitter<any>;
    @Event() fieldFetchData: EventEmitter<IFormSearch>;

    protected slidesOptions;
    protected coreConfig: ICoreConfig = (window as any).coreConfigService;

    private ionSlides: HTMLIonSlidesElement;
    private currentScrollPositions: number[];
    private fullWindowHeight: number;
    private inputBottomYPosition: number;
    private translate: ITranslateService = (window as any).translateService;

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
        if (this.coreConfig.isIonic()) {
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

    getFieldState(field: IFormField) {
        return this.fieldsState[field.name] || {};
    }

    setFieldState(field: IFormField, state) {
        this.fieldsState[field.name] = state;
    }

    getSlideState(slideIndex: number) {
        return this.slidesState[slideIndex] || {};
    }

    onInputChanged(event: CustomEvent, field: IFormField) {
        setFieldData(field, event.detail, this.currentData, this.suffix);
        this.updateState();
        this.dataChanged.emit(this.currentData);
    }

    onInputValidityChanged(event: CustomEvent, field: IFormField, slideIndex: number) {
        this.fieldsState = this.fieldsState || {};
        this.fieldsState[field.name] = this.fieldsState[field.name] || {};
        this.fieldsState[field.name].validity = event.detail;
        this.fieldsState = { ...this.fieldsState };
    }

    onInputFocused(inputIndex: number) {
        if (this.coreConfig.isCordova()) {
            let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
            let inputDimensions = currentSlide.querySelectorAll('yoo-form-input-container')[inputIndex].getBoundingClientRect();
            this.inputBottomYPosition = inputDimensions.top + inputDimensions.height;
            this.onKeyboardChange();
        }
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
    forceFieldUpdate(field: IFormField) {
        let el = this.host.querySelector('[attr-name=' + field.name + ']') as any;
        if (el) {
            switch (field.type) {
                case FormFieldType.autocomplete:
                    (el as HTMLYooFormAutocompleteElement).values = field.values;
                    break;
            }
        }
    }

    @Method()
    isValid() {
        return this.validity;
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

    slideHasAdvancedFields(slide: ISlide) {
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

    onShowAdvancedFields(slide: ISlide) {
        let fields = slide.items.filter(field => field.advanced && this.getFieldState(field).visible !== false);
        if (fields.length > 0) {
            fields = fields.map(field => {
                let retVal = { ...field };
                retVal.advanced = false;
                return retVal;
            });
            let slides = [{ items: fields, title: this.translate.get('ADVANCED') }];
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

    fieldHasValue(field: IFormField) {
        return hasValue(field, this.currentData, this.suffix);
    }

    updateState() {
        this.progress = 0;
        let total = 0;
        let filed = 0;
        updateFormulas(this.slides, this.currentData, this.suffix);
        this.slides.forEach((slide, i) => {
            let isValid = true;
            let slideHasValue = false;
            slide.items.forEach(field => {
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

    getInputType(field: IFormField) {
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
            let currentSlide = this.host.querySelectorAll('ion-slide')[this.activeIndex];
            let ionScroll = currentSlide.querySelector('ion-scroll') as HTMLIonScrollElement;
            ionScroll.scrollToPoint(0, (this.currentScrollPositions[this.activeIndex] + scrollDistance), 0);
        }
    }

    onFetchData(field: IFormField, ev: CustomEvent) {
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
                    <yoo-button onClick={() => this.onSlideNext()} text={this.translate.get('START')} class="large gradient-success"></yoo-button>
                </div>
            </ion-slide> : null;
    }

    renderSlideHeader(slide: ISlide, slideIndex: number) {
        return this.showTabs ? <div attr-layout="row" class={'header ' + (this.getSlideState(slideIndex).validity ? 'success' : '')}>
            {this.activeIndex > 0 ? <i class="yo-left" onClick={() => this.onSlidePrevious()}></i> : null}
            <div class="title" attr-flex>{this.translate.polyglot(slide.title)}</div>
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
                                            return this.getFieldState(field).visible !== false && !field.advanced ?
                                                <yoo-form-input-container
                                                    label={(field.required ? '* ' : '') + this.translate.polyglot(field.title || field.name.toUpperCase())}
                                                    description={this.translate.polyglot(field.description)}>
                                                    {this.renderInput(field, slideIndex, inputIndex)}
                                                </yoo-form-input-container> : null;
                                        })
                                    }
                                    {this.slideHasAdvancedFields(slide) ? <div class="toolbar-spacer"></div> : null}
                                </ion-scroll>
                                {
                                    this.slideHasAdvancedFields(slide) ?
                                        <div class="toolbar">
                                            <i class="yo-settings" onClick={(ev) => this.onShowAdvancedFields(slide)}></i>
                                        </div> : null
                                }
                            </div>
                        </ion-slide>
                    )}
                </ion-slides>
            );
        }
        return null;
    }

    renderInput(field: IFormField, slideIndex: number, inputIndex: number) {
        let validators = field.required ? [{ name: 'required' }] : null;
        let value = getFieldValue(field, this.currentData, this.suffix);

        switch (field.type) {
            case FormFieldType.text:
            case FormFieldType.number:
            case FormFieldType.tel:
            case FormFieldType.password:
                return <yoo-form-input
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    type={this.getInputType(field)}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                    onInputFocused={() => this.onInputFocused(inputIndex)}></yoo-form-input>;

            case FormFieldType.date:
            case FormFieldType.datetime:
            case FormFieldType.time:
                return <yoo-form-date-time
                    attr-name={field.name}
                    value={value}
                    validators={validators}
                    type={field.type}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                    onInputFocused={() => this.onInputFocused(inputIndex)}
                ></yoo-form-date-time>;

            case FormFieldType.toggle:
                return <yoo-form-toggle
                    attr-name={field.name}
                    validators={validators}
                    type={'normal'}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                    ></yoo-form-toggle>;
            case FormFieldType.checkbox:
                return <yoo-form-checkbox
                    attr-name={field.name}
                ></yoo-form-checkbox>;

            case FormFieldType.range:
                return <yoo-form-range
                    attr-name={field.name}
                    min={field.min}
                    max={field.max}
                    value={{ inf: 0, sup: value }}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    double={false}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                ></yoo-form-range>;

            case FormFieldType.autocomplete:
                return <yoo-form-autocomplete
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    multiple={field.multiple}
                    useTranslate={field.translate}
                    validators={validators}
                    entityType={field.collectionName as any} values={field.values}
                    onFetchData={(ev) => this.onFetchData(field, ev)}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                ></yoo-form-autocomplete>;

            case FormFieldType.textarea:
                return <yoo-form-text-area
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                    onInputFocused={() => this.onInputFocused(inputIndex)}
                ></yoo-form-text-area>;

            case FormFieldType.starrating:
                return <yoo-form-star-rating class="success"
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                ></yoo-form-star-rating>;

            case FormFieldType.signature:
                return <yoo-form-signature-pad
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                ></yoo-form-signature-pad>;

            case FormFieldType.select:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.selectmulti:
                return <yoo-form-button-choice
                    attr-name={field.name}
                    value={value}
                    readonly={this.getFieldState(field).readonly || this.forceReadonly}
                    values={field.values}
                    validators={validators}
                    onInputChanged={(event) => this.onInputChanged(event, field)}
                    onValidityChanged={(event) => this.onInputValidityChanged(event, field, slideIndex)}
                ></yoo-form-button-choice>;
            default:
                return <div> FormFieldType.{field.type} is not supported</div>;
        }
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
