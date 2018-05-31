import { Component, Element, Event, EventEmitter, State, Prop, Method } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormPhoto } from '@shared/interfaces';

import { setValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { getBackImageStyle, cloudinary, showModal } from '../../../utils/helpers';
import { services } from '../../../services';

import { Camera, PictureSourceType, DestinationType, EncodingType, MediaType } from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';

@Component({
    tag: 'yoo-form-photo',
    styleUrl: 'form-photo.scss',
    scoped: true
})
export class YooFormPhotoComponent implements IFormPhoto {

    @Prop({ mutable: true }) value: string | Array<string>;
    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<string>>;
    @Prop() placeholder: string;
    @Prop() required: boolean;
    @Prop() readonly: boolean;
    @Prop() type: 'video' | 'audio' | 'photo';
    @Prop() multiple: boolean;
    @Prop() min: number;
    @Prop() max: number;
    @Prop() maxWidth: number;
    @Prop() duration: number;
    @Prop() saveGeoloc: boolean;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @State() validity: boolean;

    @Element() host: HTMLStencilElement;

    private maxSizeSmall = 1280;
    private maxSize = 2048;
    private devices: Array<{ label: string; kind: string; deviceId: string; _id: string; }>;

    componentWillLoad() {
        setValidator(this);
    }

    @Method()
    isValid() {
        return this.validity;
    }

    onCameraCapture() {
        if (services.coreConfig.isCordova()) {
            if (this.type === 'photo') {
                this.capturePhoto();
            } else if (this.type === 'audio') {
                this.captureAudio();
            } else if (this.type === 'video') {
                this.captureVideo();
            }
        } else {
            if (this.type === 'photo') {
                if (navigator && navigator.mediaDevices) {
                    navigator.mediaDevices.enumerateDevices().then((devices) => {
                        this.devices = devices.filter(d => d.kind === 'videoinput').map((d, i) => ({ _id: d.deviceId, deviceId: d.deviceId, label: d.label || 'webcam ' + i, kind: d.kind }));
                        if (this.devices && this.devices.length > 0) {
                            this.captureFromWebcam(this.devices[0]);
                        }
                    });
                }

            }
        }
    }

    capturePhoto() {
        let allowEdit = !services.coreConfig.isIOS() && services.session && services.session.user && services.session.user.allowPhotoEdit;
        let saveToPhotoAlbum = false;
        return Camera.getPicture({
            quality: 70,
            destinationType: DestinationType.FILE_URL,
            sourceType: PictureSourceType.CAMERA,
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
            setValueAndValidateInput(imageData, this);
            services.files.moveToImageDirectory(imageData, services.session.user ? services.session.user.disablePhotoOrientationAutoFix : false).then((newPath: string) => {
                setValueAndValidateInput(newPath, this);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
            });
            //this.clearPhotoEdit();
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

    captureFromWebcam(device) {
        let webcam: any = document.createElement('yoo-form-photo-webcam-dialog');
        webcam.device = device;
        showModal(webcam).then(ret => {
            if (ret && ret.data) {
                setValueAndValidateInput(ret.data, this);
            }
        });
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

    renderReadonly() {
        return <div class="readonly">{this.value}</div>;
    }

    renderEditable() {
        return <div class="container">
            {!this.value ?
                <div class="camera-container" attr-layout="column" attr-layout-align="center center">
                    <i class={this.getIcon() + ' success'} onClick={(ev) => this.onCameraCapture()}></i>
                </div> :
                <div class="camera-container" attr-layout="column" attr-layout-align="center center" style={getBackImageStyle(cloudinary(this.value as string, 500, 500))}>
                </div>}
        </div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
