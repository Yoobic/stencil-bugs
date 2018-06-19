import { Component, Element, Prop } from '@stencil/core';
import { services } from '../../../services';
import { closeModal } from '../../../utils/helpers/helpers';
import * as JpegCamera from 'jpeg-camera/dist/jpeg_camera_no_flash';

@Component({
    tag: 'yoo-form-photo-webcam-dialog',
    styleUrl: 'form-photo-webcam-dialog.scss',
    scoped: true
})
export class YooFormPhotoWebcamDialogComponent {

    @Prop() device: any;

    @Element() host: HTMLStencilElement;

    private holderRef: HTMLElement;
    private webcamCamera;
    private _jpegCamera = (window as any).JpegCamera || JpegCamera;

    componentDidLoad() {
        this.holderRef = this.host.querySelector('#webcamHolder');
        this.initWebcam(this.device.deviceId);
    }

    componentDidUnload() {
        this.cleanUpCamera();
    }

    initWebcam(deviceId: string) {
        //this.getJpegCamera().then(() => {
        if (this.webcamCamera) {
            this.webcamCamera.stop();
        }
        let options: any = {
            shutter_ogg_url: 'assets/audio/shutter.ogg',
            shutter_mp3_url: 'assets/audio/shutter.mp3'
        };

        if (this.device) {
            options.deviceId = this.device.deviceId;
            options.mirror = false;
        }
        if (this.holderRef) {
            try {
                this.webcamCamera = new this._jpegCamera(this.holderRef, options);
            } catch (e) { }
        }
        //});
    }

    cleanUpCamera() {
        if (this.webcamCamera) {
            try {
                if (this.webcamCamera && this.webcamCamera.audio_context && this.webcamCamera.audio_context.state !== 'closed') {
                    this.webcamCamera.audio_context.close();
                }
            } catch (err) { }
            try {
                this.webcamCamera.stop();
            } catch (err) { }
        }
    }

    onCancel() {
        this.cleanUpCamera();
        closeModal(null);
    }

    onSave() {
        if (this.webcamCamera) {
            try {
                let snapshot = this.webcamCamera.capture();
                snapshot.get_canvas(canvas => {
                    let canvasData = canvas.toDataURL('image/jpeg', 0.7);
                    //this.cleanUpCamera();
                    if (canvasData && canvasData.length > 10) {
                        closeModal(canvasData);
                    }
                });
            } catch (err) { }
        }
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
                    <ion-title>{services.translate.get('ADVANCED')}</ion-title>
                    <ion-buttons slot="end" onClick={() => this.onSave()}>
                        <ion-button color="success">{services.translate.get('SAVE')}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>,
            //</div>,
            //<div class="content">
            <ion-content scrollEnabled={false} class="bg-light">
                <div id="webcamHolder">Webcam</div>
            </ion-content>
            //</div>
        ];
    }
}