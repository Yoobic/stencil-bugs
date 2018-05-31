import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { IFile } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-document-dialog',
    styleUrl: 'form-document-dialog.scss',
    scoped: true
})
export class YooFormDocumentModalComponent {

    @Prop() document: IFile;
    @Prop() type: 'image' | 'document';
    @Prop() readonly: boolean;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() host: HTMLStencilElement;
    public preview: string;
    public isVideo: boolean = false;
    public icon: string;
    public filename: string;

    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
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
                </ion-toolbar>
            </div>,
            //</ion-header>,
            //<ion-content>
            <div class="content">
                <yoo-form-document
                    document={this.document}
                    type={this.type}
                    readonly={this.readonly}
                ></yoo-form-document>
            </div>
            //</ion-content>
        ];
    }

}