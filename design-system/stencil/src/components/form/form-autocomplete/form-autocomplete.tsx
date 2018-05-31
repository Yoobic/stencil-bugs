import { Component, Element, Prop, Event, EventEmitter, State, Method } from '@stencil/core';
import { IFormAutocomplete, IGridSearch, CardType, EntityType, Validator, AsyncValidator, ValidatorEntry } from '@shared/interfaces';
import { setValidator, setAsyncValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { debounce } from '../../../utils/helpers/helpers';
const AUTOCOMPLETE_DROPDOWN_HEIGHT = 177;
@Component({
    tag: 'yoo-form-autocomplete',
    styleUrl: 'form-autocomplete.scss',
    scoped: true
})
export class YooFormAutocompleteComponent implements IFormAutocomplete<any> {

    @Prop() multiple: boolean = false;
    @Prop() values: any[] = [];
    @Prop() entityType: EntityType;
    @Prop() displayType: CardType = 'card-list';
    @Prop({ mutable: true }) value: Array<any>;
    @Prop() required: boolean;
    @Prop() validators: Array<Validator<any> | ValidatorEntry>;
    @Prop() asyncValidators: Array<AsyncValidator<any>>;
    @Prop() useTranslate: boolean;
    @Prop({ mutable: true }) pageSize: number = 20;
    @Prop() readonly: boolean;
    @Prop() placeholder: string;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;
    @Event() fetchData: EventEmitter<IGridSearch>;

    @Element() host: HTMLStencilElement;

    @State() validity: boolean;

    protected isLocal: boolean;

    private formDynamic: HTMLElement;
    private formDynamicBottom: number;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    @Method()
    isValid() {
        return this.validity;
    }

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        if (this.values && this.values.length > 0) {
            this.isLocal = true;
        }
    }

    componentDidLoad() {
        this.formDynamic = document.querySelector('yoo-form-dynamic') ? document.querySelector('yoo-form-dynamic') : null;
        let formDynamicToolbar = this.formDynamic ? this.formDynamic.querySelector('.slide-container > .toolbar') : null;
        this.formDynamicBottom = this.formDynamic ? (formDynamicToolbar ? formDynamicToolbar.getBoundingClientRect().top : this.formDynamic.getBoundingClientRect().bottom) : 0;
    }

    get dropdownOpenUp(): boolean {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT > this.formDynamicBottom);
    }

    get scrollDistance(): number {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom > this.formDynamicBottom) ? ((inputBottom) - this.formDynamicBottom) : 0;
    }

    onItemSelect(ev: CustomEvent) {
        ev.stopPropagation();
        setValueAndValidateInput(ev.detail, this);
    }

    onFetchData(ev: CustomEvent) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }

    onInputFocused() {
        this.showContainer();
    }

    onInputBlurred() {

    }

    onSearchIconClicked() {
        this.hideContainer();
    }

    onSearchInputChanged(ev: CustomEvent) {
        ev.stopPropagation();
        this.fetchData.emit({ search: ev.detail, appendData: false, currentPage: 0, pageSize: this.pageSize });
    }

    hideContainer() {
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: none;');
    }

    showContainer() {
        if (this.dropdownOpenUp) {
            this.host.querySelector('.outer-container').setAttribute('style', 'flex-direction: column-reverse;');
        }
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: block;');
        if (this.scrollDistance !== 0 && this.formDynamic) {
            let ionScroll = this.formDynamic.querySelector('ion-scroll') as HTMLIonScrollElement;
            ionScroll.scrollToPoint(0, this.scrollDistance, 0);
        }
    }

    renderEditable() {
        return <div class="outer-container" attr-layout="column">
            <yoo-form-input class="stable simple-icon"
                placeholder={this.placeholder}
                icon-suffix="yo-down"
                onInputFocused={() => this.onInputFocused()}
                onInputBlurred={() => this.onInputBlurred()}
                onIconClicked={() => this.onSearchIconClicked()}
                onInputChanged={(ev) => debounce(this.onSearchInputChanged, 500)(ev)}
            ></yoo-form-input>
            <div class="items-container" >
                <ion-scroll forceOverscroll={false}>
                    <yoo-grid
                        items={this.values}
                        keepSelection={true}
                        multiple={this.multiple}
                        displayType={this.displayType}
                        onSelect={(ev) => this.onItemSelect(ev)}
                        entityType={this.entityType}
                        onFetchData={(ev) => this.onFetchData(ev)}
                        hideHeader={true}
                        hideFooter={true}
                        isLocal={this.isLocal}
                        useTranslate={this.useTranslate}
                        initialSelection={this.value}
                    ></yoo-grid>
                </ion-scroll>
            </div>
        </div>;
    }

    renderReadonly() {
        return this.value ? [].concat(this.value).map(v => <div innerHTML={v}></div>) : null;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }

}
