import { Component, Element, Prop } from '@stencil/core';
import { closeModal } from '../../../utils/helpers/helpers';

@Component({
    tag: 'yoo-form-photo-view-dialog',
    styleUrl: 'form-photo-view-dialog.scss',
    scoped: true
})
export class YooFormPhotoViewDialogComponent {

    @Prop() label: string;
    @Prop() preview: any;
    @Prop() allowAnnotate: boolean;
    @Prop() edit: any;
    @Prop() imageRecognitionResults: Array<{ title: string; value: any; color: string; hidden?: boolean; }>;
    @Prop() isStitch: boolean;

    @Element() host: HTMLStencilElement;

    // private showImageRecognitionResults: boolean = false;

    onCancel() {
        closeModal(null);
    }

    render() {
        return [
            //<div class={'shadow header ' + (services.coreConfig.isIphoneX() ? 'iphone-x' : '')}>
            <ion-header class="shadow" no-border>
                <ion-toolbar color="light">
                    <ion-buttons slot="start">
                        <ion-button class="close" color="dark" onClick={() => this.onCancel()}>
                            <i slot="icon-only" class="yo-close"></i>
                        </ion-button>
                    </ion-buttons>
                    <ion-title>{this.label}</ion-title>
                </ion-toolbar>
            </ion-header>,
            // </div>,
            //<div class="content">
            <ion-content scrollEnabled={false}>
                <div class="images">
                    {!(this.edit && this.isStitch) ? <img class="preview" src={this.preview} /> : null}
                    {this.edit ? <img class="preview edit" src={this.edit} /> : null}
                    {this.imageRecognitionResults && this.imageRecognitionResults.length > 0 ?
                        <div class="image-recos">
                            {this.imageRecognitionResults.map((result) => {
                                return !result.hidden ? <div class="image-reco"><span class="image-reco-value">{result.title}:{result.value}</span></div> : null;
                            })}
                        </div> : null}
                </div>
            </ion-content>
            // </div>
        ];
    }
}