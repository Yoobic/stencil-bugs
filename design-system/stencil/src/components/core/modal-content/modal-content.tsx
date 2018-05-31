import { Component } from '@stencil/core';

@Component({
    tag: 'modal-content',
    styleUrl: 'modal-content.scss',
    scoped: true
})
export class ModalContentComponent {

    componentDidLoad() {
    }

    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
    }

    render(): JSX.Element {
        return ([
            <ion-header>
                <ion-toolbar color="light">
                    <ion-buttons slot="start">
                        <ion-button class="close" color="dark" onClick={() => this.onCancel()}>
                        CLOSE
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Stencil modal</ion-title>
                    <ion-buttons slot="end">
                        <ion-button color="success">Success</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            ,
            <ion-content>
                <div>
                    This content should be visible
                    <yoo-button text="inside stencil"></yoo-button>
                    <yoo-loader></yoo-loader>
                    <yoo-button text="inside stencil2"></yoo-button>
                    <yoo-button text="inside stencil3"></yoo-button>                    
                    <yoo-button text="inside stencil4"></yoo-button>
                </div>
            </ion-content>
        ]);
    }
}
