import { Component, Prop, State, Element, Method } from '@stencil/core';

@Component({
    tag: 'yoo-form-dynamic-dialog',
    styleUrl: 'form-dynamic-dialog.scss',
    scoped: true
})
export class YooFormDynamicModalComponent {

    @Prop() slides: Array<any>;
    @Prop() data: Object;
    @Prop() showTabs: boolean;
    @Prop() showRecap: boolean;
    @Prop() suffix: string;
    @Prop() forceReadonly: boolean;

    @Element() host: HTMLStencilElement;

    @State() currentData: Object;
    @State() validity: boolean = false;

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
            //<div class="shadow header">
            <ion-header class="shadow" no-border>
                <ion-toolbar color="light">
                    <ion-buttons slot="start">
                        <ion-button class="close" color="dark" onClick={() => this.onCancel()}>
                            <i slot="icon-only" class="yo-close"></i>
                        </ion-button>
                    </ion-buttons>
                    <ion-title>{('ADVANCED')}</ion-title>
                    <ion-buttons slot="end" onClick={() => this.onSave()}>
                        <ion-button color="success" disabled={!this.isValid()} >{('SAVE')}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>,
            //</div>,
            //<div class="content">
            <ion-content>
                <yoo-form-dynamic
                    slides={this.slides}
                    data={this.data}
                    show-recap={this.showRecap}
                    suffix={this.suffix}
                    forceReadonly={this.forceReadonly}
                    onDataChanged={ev => this.onDataChange(ev)}
                ></yoo-form-dynamic>
            </ion-content>
            // </div>
        ];
    }

}