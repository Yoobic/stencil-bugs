import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator } from '@shared/interfaces';
import { setValidator, setAsyncValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { getBackImageStyle, cloudinary } from '../../../utils/helpers';

import signature_pad from 'signature_pad';

@Component({
    tag: 'yoo-form-signature-pad',
    styleUrl: 'form-signature-pad.scss',
    scoped: true
})
export class YooFormSignaturePadComponent {

    @Prop({ mutable: true }) value: string;
    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<string>>;

    @Prop() required: boolean;
    @Prop() readonly: boolean;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() protected host: HTMLElement;

    protected signaturePad: signature_pad;

    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }

    componentDidLoad() {
        if (!this.readonly) {
            this.canvasSetup();
        }
    }

    canvasSetup() {
        let canvas = this.host.querySelector('canvas');
        let ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = this.host.querySelector('.container').clientWidth;
        canvas.height = this.host.querySelector('.container').clientHeight;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad = new signature_pad(canvas, { backgroundColor: '#ffffff', penColor: '#000000', onEnd: () => this.onSave() });
        if (this.value) {
            let image = new Image();
            image.onload = function () {
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = this.value;
        }
    }

    onClear() {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
        setValueAndValidateInput(null, this);
    }

    onSave() {
        let data;
        if (!this.signaturePad || this.signaturePad.isEmpty()) {
            data = null;
        } else {
            data = this.signaturePad.toDataURL();
        }
        setValueAndValidateInput(data, this);
    }

    renderEditable() {
        return [
            <div class="container">
                <canvas class="swiper-no-swiping"></canvas>
            </div>,
            <div class="link" onClick={this.onClear.bind(this)}>Clear</div>
        ];
    }

    renderReadonly() {
        return this.value ? <div class="image" style={getBackImageStyle(cloudinary(this.value, 500, 500))}></div> : null;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }

}
