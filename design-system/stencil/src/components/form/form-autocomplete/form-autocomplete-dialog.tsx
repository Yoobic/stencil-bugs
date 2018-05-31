import { Component, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import { CardType, EntityType, IGridSearch } from '@shared/interfaces';
import { services } from '../../../services';

const HEADER_HEIGHT = 44;

@Component({
    tag: 'yoo-form-autocomplete-dialog',
    styleUrl: 'form-autocomplete-dialog.scss',
    scoped: true
})
export class YooFormAutocompleteDialogComponent {

    @Prop() values: any[] = [];
    @Prop({ mutable: true }) value: Array<any>;
    @Prop() multiple: boolean = false;
    @Prop() displayType: CardType = 'card-list';
    @Prop() entityType: EntityType;
    @Prop() isLocal: boolean;
    @Prop() useTranslate: boolean;

    @Event() fetchData: EventEmitter<IGridSearch>;

    @State() fullscreen: boolean = false;
    @State() selection: Array<any>;

    @Element() host: HTMLStencilElement;

    private fullScrollHeight: number;

    componentDidLoad() {
        let pageHeight = window.innerHeight;
        this.fullScrollHeight = pageHeight - HEADER_HEIGHT;
    }

    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
    }

    onSave() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(this.selection);
    }

    onFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.setModalDimensions();
    }

    onSearchInputFocused() {
        this.fullscreen = true;
        this.setModalDimensions();
    }

    onItemSelect(ev: CustomEvent) {
        ev.stopPropagation();
        this.selection = ev.detail;
    }

    onFetchData(ev: CustomEvent) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }

    setModalDimensions() {
        let bottomContainer = this.host.querySelector('.bottom-container');
        let bottomHeight = this.fullscreen ? '100%' : '305px';
        let scroll = this.host.querySelector('ion-scroll');
        let scrollHeight = this.fullscreen ? `${this.fullScrollHeight}px` : '261px';
        bottomContainer.setAttribute('style', `height: ${bottomHeight}`);
        scroll.setAttribute('style', `height: ${scrollHeight}`);
    }

    render() {
        return (
            <div class="outer-container" attr-layout="column">
                <div class="top-container" onClick={() => this.onCancel()}>
                </div>
                <div class="bottom-container">
                    <div class="shadow header">
                        <ion-toolbar>
                            <ion-buttons slot="start">
                                <ion-button class="close" color="dark" onClick={() => this.onCancel()}>
                                    <i slot="icon-only" class="yo-close"></i>
                                </ion-button>
                            </ion-buttons>
                            <ion-title>{services.translate.get('SELECT')}</ion-title>
                            <ion-buttons slot="end" onClick={() => this.onSave()}>
                                <ion-button color="success" >{services.translate.get('DONE')}</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </div>
                    <div class="content">
                        <ion-scroll>
                            <yoo-grid
                                class="show-select-circles"
                                items={this.values}
                                keepSelection={true}
                                multiple={this.multiple}
                                displayType={this.displayType}
                                entityType={this.entityType}
                                hideHeader={false}
                                showFiltersSimple={true}
                                hideFooter={true}
                                isLocal={this.isLocal}
                                useTranslate={this.useTranslate}
                                initialSelection={this.value}
                                onSelect={(ev) => this.onItemSelect(ev)}
                                onFetchData={(ev) => this.onFetchData(ev)}
                                onSearchInputFocused={() => this.onSearchInputFocused()}
                            ></yoo-grid>
                        </ion-scroll>
                    </div>
                </div>
                <div class="fullscreen-container">
                    <yoo-button class="fab icon-only dark-fab" icon={this.fullscreen ? 'yo-minimize' : 'yo-maximize'} onClick={() => this.onFullscreen()}></yoo-button>
                </div>
            </div>
        );
    }

}