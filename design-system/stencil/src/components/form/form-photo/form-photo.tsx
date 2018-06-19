import { Component, Element, Event, EventEmitter, State, Prop, Method } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormPhoto, IAlgorithm, IPhotoEditorData } from '@shared/interfaces';

import { setValidator, setValueAndValidateInput, cleanupWKWebViewImagePath } from '../../../utils/helpers/form-input-helpers';
import { getBackImageStyle, cloudinary, showModal, showActionSheet } from '../../../utils/helpers';
import { services } from '../../../services';

import { Camera, PictureSourceType, DestinationType, EncodingType, MediaType } from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { isNumber, omit, keys, isArray } from 'lodash-es';
@Component({
    tag: 'yoo-form-photo',
    styleUrl: 'form-photo.scss',
    scoped: true
})
export class YooFormPhotoComponent implements IFormPhoto {

    @Prop({ mutable: true }) value: string | Array<string>;
    @Prop({ mutable: true }) extraData: any = {};
    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<string>>;
    @Prop() placeholder: string;
    @Prop() required: boolean;
    @Prop() readonly: boolean;
    @Prop() type: 'video' | 'audio' | 'photo';
    @Prop() multiple: boolean;
    @Prop() min: number = 1;
    @Prop() max: number = 1;
    @Prop() maxWidth: number;
    @Prop() duration: number;
    @Prop() saveGeoloc: boolean;
    @Prop() allowLibrary: boolean;
    @Prop() allowAnnotate: boolean;
    @Prop() isImageRecognition: boolean;
    @Prop() algorithm: IAlgorithm;
    @Prop() isBackgroundProcess: boolean;
    @Prop() label: string;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;
    @Event() imageRecognition: EventEmitter<any>;
    @Event() imageSaved: EventEmitter<IPhotoEditorData>;

    @State() validity: boolean;
    @State() isProcessing: boolean;
    @State() progress: number;
    @State() imageRecognitionResults: Array<{ title: string; value: any; color: string; hidden?: boolean }>;
    @State() photoIndexes: Array<number> = [];

    @Element() host: HTMLStencilElement;

    private maxSizeSmall = 1280;
    private maxSize = 2048;
    private devices: Array<{ label: string; kind: string; deviceId: string; _id: string; }>;
    private fileInputs: any;
    private imageRecognitionKpiKeys: Array<string>;

    componentWillLoad() {
        setValidator(this);
        if (this.multiple) {
            for (let i = 0; i < this.min; i++) {
                this.photoIndexes.push(i);
            }
        }
    }

    componentDidLoad() {
        if (this.multiple) {
            this.fileInputs = this.host.querySelectorAll('input');
        } else {
            this.fileInputs = this.host.querySelector('input');
        }
    }

    componentWillUpdate() {
        if (this.multiple) {
            this.value = this.value || [];
        }
    }

    @Method()
    isValid() {
        return this.validity;
    }

    /** If there is index, the field is a multiphoto */
    setFieldValue(index: number, data: string) {
        if (index === undefined) {
            setValueAndValidateInput(data, this);
        } else {
            let newValue: any = this.value.slice();
            newValue[index] = data;
            setValueAndValidateInput(newValue, this);
        }
    }

    getFieldValue(index: number) {
        return index === undefined ? this.value : this.value[index];
    }

    /** for webcam, choose which device to take photo/video */
    capture(device, index?: number) {
        if (services.coreConfig.isCordova()) {
            if (this.type === 'photo') {
                this.capturePhoto(false, index);
            } else if (this.type === 'audio') {
                this.captureAudio();
            } else if (this.type === 'video') {
                this.captureVideo();
            }
        } else {
            if (this.type === 'photo') {
                this.captureFromWebcam(device, index);
            }
        }
    }

    capturePhoto(useLibrary: boolean, index?: number) {
        let allowEdit = !services.coreConfig.isIOS() && services.session && services.session.user && services.session.user.allowPhotoEdit;
        let sourceType = useLibrary ? PictureSourceType.PHOTOLIBRARY : PictureSourceType.CAMERA;
        let saveToPhotoAlbum = false;
        return Camera.getPicture({
            quality: 70,
            destinationType: DestinationType.FILE_URL,
            sourceType: sourceType,
            allowEdit: allowEdit,
            correctOrientation: true,
            encodingType: EncodingType.JPEG,
            targetWidth: this.getMaxSize(),
            targetHeight: allowEdit ? Math.round(this.getMaxSize() * (window.innerHeight / window.innerWidth)) : this.getMaxSize(),
            saveToPhotoAlbum: saveToPhotoAlbum,
            mediaType: this.type === 'video' ? MediaType.VIDEO : MediaType.PICTURE
        }).then((imageData: string) => {

            if (services.coreConfig.isAndroid() && this.type === 'video' && imageData && imageData.indexOf('file://') < 0) {
                imageData = 'file://' + imageData;
            }
            if (imageData && imageData.indexOf('?') > 0) {
                imageData = imageData.substring(0, imageData.indexOf('?'));
            }

            this.setFieldValue(index, imageData);

            services.files.moveToImageDirectory(imageData, services.session.user ? services.session.user.disablePhotoOrientationAutoFix : false).then((newPath: string) => {
                newPath = cleanupWKWebViewImagePath(newPath);
                this.setFieldValue(index, newPath);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
            });
            this.clearPhotoEdit();
        });
    }

    captureVideo() {
        let options: CaptureVideoOptions = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureVideo(options).then((files: Array<MediaFile>) => {
            if (files && files.length > 0) {
                let path = (services.coreConfig.isCordova() && services.coreConfig.isIOS() ? 'file://' : '') + files[0].fullPath;
                setValueAndValidateInput(path, this);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
                //});
            }
        });
    }

    captureAudio() {
        let options: CaptureVideoOptions = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureAudio(options).then((files: Array<MediaFile>) => {
            if (files && files.length > 0) {
                let path = (services.coreConfig.isCordova() && services.coreConfig.isIOS() ? 'file://' : '') + files[0].fullPath;
                setValueAndValidateInput(path, this);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
                //});
            }
        });
    }

    captureFromWebcam(device, index) {
        let webcam: any = document.createElement('yoo-form-photo-webcam-dialog');
        webcam.device = device;
        showModal(webcam).then(ret => {
            if (ret && ret.data) {
                this.setFieldValue(index, ret.data);
            }
        });
    }

    captureFromDisk(index?: number) {
        if (this.fileInputs) {
            let event;
            if (services.coreConfig.isIE() || services.coreConfig.isIE11()) {
                event = document.createEvent('MouseEvent');
                event.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            } else {
                event = new MouseEvent('click', { bubbles: false });
            }
            let targetElement = this.getTargetElement(index);
            targetElement.dispatchEvent(event);
        }
    }

    captureGeoloc() {
        // if (this.saveGeoloc) {
        //     this.geoloc.getLocation(true).then((pos) => {
        //         this.extraData._geoloc = pos.toGeoLoc(true);
        //         this.extraDataChange.emit(this.extraData);
        //     }, (err) => { });
        // }
    }

    getIcon() {
        switch (this.type) {
            case 'video':
                return 'yo-videocamera-solid';
            case 'audio':
                return 'yo-microphone-solid';
            default:
                return 'yo-camera-solid ';
        }
    }

    getMaxSize() {
        if (services.session.user && services.session.user.photoMaxWidth > 0) {
            return services.session.user.photoMaxWidth;
        }
        if (services.coreConfig.isIonic() && services.coreConfig.isCordova()) {
            if (Device.model === 'MC40N0' || Device.model === 'ET1' || Device.model === 'SM-T580' || Device.platform === 'blackberry10' || Device.model === 'SM-A310F' || Device.model === 'SM-A510F' || Device.model === 'SM-J320FN') {
                return this.maxSizeSmall;
            }
        }
        return this.maxWidth || this.maxSize;
    }

    upload(index?: number) {
        if (services.coreConfig.isCordova()) {
            this.capturePhoto(true, index);
        } else {
            this.captureFromDisk(index);
        }
    }

    getTargetElement(index) {
        return index !== undefined ? Array.from(this.fileInputs).find((item, ind) => ind === index) : this.fileInputs;
    }

    onFileSelect(ev, index?: number) {
        let targetElement = this.getTargetElement(index);
        services.files.read(targetElement.files[0], 'blob')
            .then((data: string) => {
                this.setFieldValue(index, data);
                this.clearPhotoEdit(index);
            });
    }

    clearPhotoEdit(index?: number) {
        if (!index) {
            if (this.extraData && (this.extraData.edit || (this.extraData.texts && this.extraData.texts.length > 0))) {
                this.extraData = { edit: null, texts: [] };
            }
        } else {
            if (this.extraData && this.extraData[index] && (this.extraData[index].edit || (this.extraData[index].texts && this.extraData[index].texts.length > 0))) {
                this.extraData[index] = { edit: null, texts: [] };
            }
        }
        // this.extraDataChange.emit(this.extraData);
    }

    openPreview(index?: number) {
        let photoView: any = document.createElement('yoo-form-photo-view-dialog');
        photoView.label = services.translate.polyglot(this.label || 'PREVIEW');
        photoView.preview = this.getFieldValue(index);
        photoView.allowAnnotate = this.allowAnnotate;
        if (index === undefined) {
            photoView.edit = this.extraData && this.extraData.edit;
        } else {
            photoView.edit = this.extraData && this.extraData[index] ? this.extraData[index].edit : null;
        }
        photoView.imageRecognitionResults = this.imageRecognitionResults;
        photoView.isStitch = this.extraData && this.extraData.stitchMode;
        showModal(photoView).then(ret => { });
    }

    onAnnotate(index?: number) {
        let photoEditor: any = document.createElement('yoo-photo-editor');
        photoEditor.readonly = false;
        // Base 64 of the image
        photoEditor.src = this.getFieldValue(index) as string;

        if (index === undefined) {
            if (this.extraData) {
                photoEditor.edit = this.extraData.edit;
                photoEditor.annotations = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        } else {
            if (this.extraData && this.extraData[index]) {
                photoEditor.edit = this.extraData.edit;
                photoEditor.annotations = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        }

        showModal(photoEditor).then(retVal => {
            if (retVal) {
                this.imageSaved.emit(retVal.data);
            }
        });
    }

    deletePhoto(index?: number) {
        this.setFieldValue(index, null);
        this.clearPhotoEdit(index);
        this.clearImageRecognition();
    }

    clearImageRecognition() {
        this.progress = 0;
        if (this.imageRecognitionKpiKeys && this.imageRecognitionKpiKeys.length > 0) {
            this.imageRecognitionKpiKeys.forEach(key => {
                // this.extraDataChange.emit({ key, value: null });
            });
        }
        this.imageRecognitionResults = [];
    }

    addPhoto() {
        if (this.photoIndexes.length < this.max) {
            let newInd = this.photoIndexes.length;
            this.photoIndexes = [...this.photoIndexes, newInd];
        }
    }

    isRequired(index?: number) {
        if (index === undefined) {
            return this.required;
        } else {
            return index < this.min;
        }
    }

    async addCameraCaptureButtons(buttons: Array<any>, retake: boolean, index?: number) {
        let textPrefix = retake ? 'TAKEANEW' : 'TAKEANEW';
        if (services.coreConfig.isCordova()) {
            buttons.push({
                text: services.translate.get(textPrefix + this.type.toUpperCase()),
                handler: () => this.capture(null, index)
            });
        } else if (!services.coreConfig.isCordova() && this.type === 'photo') {
            if (navigator && navigator.mediaDevices) {
                let devices = await navigator.mediaDevices.enumerateDevices();
                this.devices = devices.filter(d => d.kind === 'videoinput').map((d, i) => ({ _id: d.deviceId, deviceId: d.deviceId, label: d.label || 'webcam ' + i, kind: d.kind }));
                if (this.devices && this.devices.length > 0) {
                    this.devices.forEach((device, i) => {
                        buttons.push({
                            text: services.translate.get(textPrefix + this.type.toUpperCase()) + ': ' + (device.label || 'WEBCAM ' + i),
                            handler: () => this.capture(device, index)
                        });
                    });
                }
            }
        }
    }

    isValueValid() {
        if (this.multiple) {
            return isArray(this.value) && this.value.length > 0;
        } else {
            return this.value !== undefined || this.value !== null;
        }
    }

    onImageRecognition(ev) {
        if (this.isValueValid() && this.algorithm) { //&& !this.isOffline
            // emit image recognition event
            this.imageRecognition.emit(this.value);
            this.isProcessing = true;
            this.progress = 0;
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    if (this.progress < 100 && this.isProcessing) {
                        this.progress += 3;
                    }
                }, 1000 * i);
            }
        }
    }

    @Method()
    processImageRecognitionResults(retVal) {
        this.progress = 100;
        this.imageRecognitionResults = [];
        this.imageRecognitionKpiKeys = keys(omit(retVal, ['time', 'original_image', 'markup_image', 'hiddenFields']));
        this.imageRecognitionKpiKeys.forEach(key => {
            let algoValue = retVal[key];
            if (isNumber(algoValue)) {
                algoValue = Math.round(algoValue * 100) / 100;
            }
            // this.extraDataChange.emit({ key, value: algoValue });
            let color = 'dark';
            if (algoValue === true) {
                color = 'balanced';
                algoValue = services.translate.get('true');
            }
            if (algoValue === false) {
                color = 'assertive';
                algoValue = services.translate.get('false');
            }
            let hidden = retVal.hiddenFields && retVal.hiddenFields.indexOf(key) >= 0;
            this.imageRecognitionResults.push({ title: services.translate.get(key.toUpperCase()), color: color, value: algoValue, hidden });
        });
        this.isProcessing = false;
        this.openPreview();
    }

    async onShowActionSheet(value, index?: number) {
        let buttons = [];
        if (!value) {
            await this.addCameraCaptureButtons(buttons, false, index);
            if (this.allowLibrary === true) {
                buttons.push({
                    text: services.translate.get('IMPORTFROMLIBRARY'),
                    handler: () => this.upload(index)
                });
            }
        } else {
            buttons.push({
                text: services.translate.get('VIEWPHOTO'),
                handler: () => this.openPreview(index)
            });
            if (this.allowLibrary === true) {
                buttons.push({
                    text: services.translate.get('IMPORTFROMLIBRARY'),
                    handler: () => this.upload(index)
                });
            }
            if (this.type === 'photo') {
                buttons.push({
                    text: services.translate.get('ANNOTATE'),
                    handler: () => this.onAnnotate(index)
                });
            }

            await this.addCameraCaptureButtons(buttons, true, index);

            buttons.push({
                text: services.translate.get(this.type === 'photo' ? 'DELETEPHOTO' : 'DELETE'),
                handler: () => this.deletePhoto(index)
            });
        }
        showActionSheet(buttons);
    }

    renderReadonly() {
        if (!this.value) {
            return null;
        }
        return <div class="readonly">{this.multiple && (this.value as any).map ? (this.value as Array<string>).map((v, i) => {
            return <div class="preview" onClick={ev => this.openPreview(i)} style={getBackImageStyle(cloudinary(v, 340, 250))}></div>;
        }) : <div class="preview" onClick={ev => this.openPreview()} style={getBackImageStyle(cloudinary(this.value as string, 340, 250))}></div>}</div>;
    }

    renderCameraContainer(value, extraData, index?) {
        return <div class="camera-container" onClick={(ev) => this.onShowActionSheet(value, index)}>
            <input type="file" onChange={(ev) => this.onFileSelect(ev, index)} accept="accept" />
            {this.isRequired(index) ? <span class="required">*</span> : null}
            {value ? <div class="preview" style={getBackImageStyle(cloudinary(value as string, 500, 500))}></div> : null}
            {extraData && extraData.edit ? <div class="edit" style={getBackImageStyle(cloudinary(extraData.edit as string, 340, 250))}></div> : null}
            {value ? <div class="overlay"></div> : null}
            <i class={this.getIcon() + (value ? ' light' : ' success')}></i>
        </div>;
    }

    renderButtonContainer() {
        return <div class="button-container" attr-layout="row" attr-layout-align="center center" onClick={(ev) => this.onImageRecognition(ev)}>
            <button type="button" class="button balanced">{!this.isProcessing ? services.translate.get('PHOTOLIVECOUNTER') : services.translate.get('PROCESSING')}</button>
        </div>;
    }

    renderEditable() {
        return <div class="container" attr-layout="column">
            {this.progress > 0 ? <yoo-progress-bar percentage={true} progress={this.progress} class="success"></yoo-progress-bar> : null}
            {!this.multiple ?
                <div class="single" attr-layout="row">
                    {this.renderCameraContainer(this.value, this.extraData)}
                    {this.isImageRecognition && !this.isBackgroundProcess ? this.renderButtonContainer() : null}
                </div> :
                <div class="multiple">
                    {this.photoIndexes.map((index) => {
                        return this.renderCameraContainer(this.value && this.value[index], this.extraData[index], index);
                    })}
                    {this.photoIndexes.length < this.max ? <div class="camera-container" onClick={() => this.addPhoto()}><i class="yo-plus"></i></div> : null}
                    {this.isImageRecognition && !this.isBackgroundProcess ? this.renderButtonContainer() : null}
                </div>
            }
            {/* <ion-action-sheet-controller></ion-action-sheet-controller> */}
        </div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
