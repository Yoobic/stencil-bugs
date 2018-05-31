import { Component, Element, Prop, Event, EventEmitter, State, Method } from '@stencil/core';
import { IFormAutocomplete, IGridSearch, CardType, EntityType, Validator, AsyncValidator, ValidatorEntry, ICoreConfig } from '@shared/interfaces';
import { setValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { debounce, showModal } from '../../../utils/helpers/helpers';

const AUTOCOMPLETE_DROPDOWN_HEIGHT = 268;

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
    @Prop({ mutable: true }) value: Array<any> | any;
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
    //@State() selection: Array<any>;

    protected isLocal: boolean;
    protected coreConfig: ICoreConfig = (window as any).coreConfigService;

    private formDynamic: HTMLYooFormDynamicElement;
    private formDynamicBottom: number;
    private dialog: HTMLYooFormAutocompleteDialogElement;

    @Method()
    isValid() {
        return this.validity;
    }

    @Method()
    updateDialogValues(values) {
        if (this.dialog) {
            this.dialog.values = values;
        }
    }

    @Method()
    hideContainer() {
        let formContainer = this.host.parentElement.parentElement;
        formContainer.classList.remove('autocomplete');
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: none;');
    }

    componentWillLoad() {
        setValidator(this);
        if (this.values && this.values.length > 0) {
            this.isLocal = true;
        }
    }

    componentDidLoad() {
        this.formDynamic = document.querySelector('yoo-form-dynamic') ? document.querySelector('yoo-form-dynamic') : null;
        let formDynamicToolbar = this.formDynamic ? this.formDynamic.querySelector('.slide-container > .toolbar') : null;
        this.formDynamicBottom = this.formDynamic ? (formDynamicToolbar ? formDynamicToolbar.getBoundingClientRect().top : this.formDynamic.getBoundingClientRect().bottom) : 0;
        this.formDynamic.addEventListener('click', () => this.hideContainer());
        this.host.addEventListener('click', function (ev) {
            ev.stopPropagation();
        });
    }

    get dropdownOpenUp(): boolean {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return (inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT > this.formDynamicBottom);
    }

    get scrollDistance(): number {
        let inputBottom = this.host.getBoundingClientRect().bottom;
        return ((inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT) > this.formDynamicBottom) ? ((inputBottom + AUTOCOMPLETE_DROPDOWN_HEIGHT) - this.formDynamicBottom) : 0;
    }

    onFetchData(ev: CustomEvent) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }

    onInputFocused() {
        this.coreConfig.isIonic() ? this.showContainerDialog() : this.showContainer();
    }

    positionItemsContainer() {

    }

    onSearchIconClicked() {
        this.hideContainer();
    }

    // tslint:disable-next-line:member-ordering
    onSearchInputChanged = debounce((ev: CustomEvent) => {
        ev.stopPropagation();
        this.fetchData.emit({ search: ev.detail, appendData: false, currentPage: 0, pageSize: this.pageSize });
    });

    showContainer() {
        let openAutoCompleteContainer = this.formDynamic.querySelector('.autocomplete') as HTMLYooFormInputContainerElement;
        if (openAutoCompleteContainer) {
            openAutoCompleteContainer.classList.remove('autocomplete');
            let autocComplete = openAutoCompleteContainer.querySelector('.content-container > yoo-form-autocomplete') as HTMLYooFormAutocompleteElement;
            autocComplete.hideContainer();
        }
        let formContainer = this.host.parentElement.parentElement;
        formContainer.classList.add('autocomplete');
        let container = this.host.querySelector('.items-container');
        container.setAttribute('style', 'display: flex;');
        if (this.scrollDistance !== 0 && this.formDynamic) {
            this.formDynamic.scrollToPoint(this.scrollDistance);
        }
    }

    showContainerDialog() {
        this.dialog = document.createElement('yoo-form-autocomplete-dialog');
        this.dialog.values = this.values;
        this.dialog.multiple = this.multiple;
        this.dialog.displayType = this.displayType;
        this.dialog.entityType = this.entityType;
        this.dialog.isLocal = this.isLocal;
        this.dialog.useTranslate = this.useTranslate;
        this.dialog.value = this.value;
        this.dialog.addEventListener('fetchData', (ev: CustomEvent) => {
            ev.stopPropagation();
            this.fetchData.emit(ev.detail);
        });
        showModal(this.dialog, null, 'half').then(ret => {
            if (ret && ret.data) {
                setValueAndValidateInput(ret.data, this);
            }
            this.dialog = null;
        });
    }

    onItemSelect(ev: CustomEvent) {
        ev.stopPropagation();
        setValueAndValidateInput(ev.detail, this);
        if (!this.multiple) {
            this.hideContainer();
        }
    }

    renderEditable() {
        return <div class="outer-container" attr-layout="column">
            <yoo-form-input class="stable simple-icon"
                readonly={true}
                icon-suffix="yo-down"
                onInputFocused={() => this.onInputFocused()}
            ></yoo-form-input>
            <div class="items-container down animated fadeIn" attr-layout="flex">
                <div class="scroll-container">
                    <ion-scroll forceOverscroll={false}>
                        <yoo-grid
                            class="show-select-circles"
                            items={this.values}
                            keepSelection={true}
                            multiple={this.multiple}
                            displayType={this.displayType}
                            onSelect={(ev) => this.onItemSelect(ev)}
                            entityType={this.entityType}
                            onFetchData={(ev) => this.onFetchData(ev)}
                            hideHeader={false}
                            hideFooter={true}
                            isLocal={this.isLocal}
                            useTranslate={this.useTranslate}
                            initialSelection={this.value}
                        ></yoo-grid>
                    </ion-scroll>
                </div>
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
