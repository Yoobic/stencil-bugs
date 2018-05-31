import { Component, Prop, State, Element, Method } from '@stencil/core';
import { ISlide, ITranslateService } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-dynamic-dialog',
    styleUrl: 'form-dynamic-dialog.scss',
    scoped: true
})
export class YooFormDynamicModalComponent {

    @Prop() slides: Array<ISlide>;
    @Prop() data: Object;
    @Prop() showTabs: boolean;
    @Prop() showRecap: boolean;
    @Prop() suffix: string;
    @Prop() forceReadonly: boolean;

    @Element() host: HTMLStencilElement;

    @State() currentData: Object;
    @State() validity: boolean = false;

    protected translate: ITranslateService = (window as any).translateService;

    componentWillLoad() {
        this.currentData = this.data || {};
    }

    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
    }

    onSave() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(this.currentData);
    }

    onDataChange(ev: CustomEvent) {
        this.currentData = ev.detail;
        let form = this.host.querySelector('yoo-form-dynamic');
        if (form) {
            this.validity = form.isValid();
        }
    }

    @Method()
    isValid() {
        return this.validity;
    }

    render() {
        return [
            //<ion-header class="shadow" no-border>
            <div class="shadow header">
                <ion-toolbar color="light">
                    <ion-buttons slot="start">
                        <ion-button class="close" color="dark" onClick={() => this.onCancel()}>
                            <i slot="icon-only" class="yo-close"></i>
                        </ion-button>
                    </ion-buttons>
                    <ion-title>{this.translate.get('ADVANCED')}</ion-title>
                    <ion-buttons slot="end" onClick={() => this.onSave()}>
                        <ion-button color="success" disabled={!this.isValid()} >{this.translate.get('SAVE')}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </div>,
            //</ion-header>,
            //
            //<ion-content>
            <div class="content">
                <yoo-form-dynamic
                    slides={this.slides}
                    data={this.data}
                    show-recap={this.showRecap}
                    suffix={this.suffix}
                    forceReadonly={this.forceReadonly}
                    onDataChanged={ev => this.onDataChange(ev)}
                ></yoo-form-dynamic>
            </div>
            //</ion-content>
        ];
    }

}