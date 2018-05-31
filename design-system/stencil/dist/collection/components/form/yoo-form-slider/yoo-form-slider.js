const inlineClass = 'inline';
export class YooFormSliderComponent {
    constructor() {
        this.minimum = 0;
        this.maximum = 100;
        this.disabled = false;
        this.hideLabel = false;
        this.hideReferences = false;
        this.doubleSlider = false;
    }
    watchHandler(newValue) {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = this.initialValue;
        }
    }
    getProgress() {
        return 100 * (this.value - this.minimum) / (this.maximum - this.minimum);
    }
    onChange(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = event.target.value;
        }
        this.handleEvent();
    }
    onChangeSecond(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.secondValue = this.minimum;
        }
        else {
            this.secondValue = event.target.value;
        }
        this.handleEvent();
    }
    handleEvent() {
        if (this.doubleSlider) {
            let lowValue = Math.min(this.value, this.secondValue);
            let highValue = Math.max(this.value, this.secondValue);
            this.doubleSliderChanged.emit({ lowValue: lowValue, highValue: highValue });
        }
        else {
            this.singleSliderChanged.emit(this.value);
        }
    }
    setDoubleProgressStyle() {
        let width = 100 * Math.abs(this.value - this.secondValue) / (this.maximum - this.minimum);
        let translate = 0;
        if (width !== 0) {
            translate = 100 * (Math.min(this.value, this.secondValue) - this.minimum) / width;
        }
        let style = { width: width + '%', transform: 'translateX(' + translate + '%)' };
        style.toString();
        let bar = this.host.querySelector('div.progress-container');
        if (bar) {
            bar.setAttribute('style', 'width: ' + width + '%; ' + 'transform: translateX(' + translate + '%)');
        }
        // reverse label if inline double
        if (this.host.className.indexOf(inlineClass) !== -1) {
            let sliderContainer = this.host.querySelector('div.slider-container');
            if (sliderContainer) {
                sliderContainer.setAttribute('style', 'flex-direction: row');
            }
        }
    }
    componentWillLoad() {
        this.value = this.initialValue;
        this.secondValue = this.minimum;
    }
    componentDidLoad() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    componentWillUpdate() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    render() {
        return (h("div", { class: 'outer-container' + ((this.disabled) ? ' disabled' : ''), "attr-layout": "flex" },
            !this.hideReferences ?
                h("label", null, this.minimum)
                : null,
            h("div", { class: "slider-container", "attr-layout": "column" },
                h("div", { class: 'label-value' + ((this.hideLabel) ? ' label-hidden' : '') }, this.disabled ?
                    h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
                    :
                        (this.doubleSlider ?
                            [h("input", { type: "number", value: this.secondValue, onChange: (event) => this.onChangeSecond(event) }),
                                (this.host.className.indexOf(inlineClass) === -1 ?
                                    h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) })
                                    : null)]
                            :
                                h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) }))),
                h("div", { class: "range-container" },
                    this.disabled ?
                        h("input", { type: "range", min: this.minimum, max: this.maximum, value: this.value, onInput: (event) => this.onChange(event), disabled: true })
                        :
                            [h("input", { type: "range", min: this.minimum, max: this.maximum, value: this.value, onInput: (event) => this.onChange(event) }),
                                (this.doubleSlider ?
                                    h("input", { class: "second-slider", type: "range", min: this.minimum, max: this.maximum, value: this.secondValue, onInput: (event) => this.onChangeSecond(event) })
                                    : null)],
                    this.doubleSlider ?
                        h("yoo-progress-bar", { class: this.host.className, "hide-progress": true })
                        :
                            h("yoo-progress-bar", { class: this.host.className, progress: this.getProgress(), "hide-progress": true })),
                this.doubleSlider && this.host.className.indexOf(inlineClass) !== -1 ?
                    h("div", { class: 'label-value' + ((this.hideLabel) ? ' label-hidden' : '') }, this.disabled ?
                        h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
                        :
                            h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) }))
                    : null),
            !this.hideReferences ?
                h("label", null, this.maximum)
                : null));
    }
    static get is() { return "yoo-form-slider"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "disabled": { "type": Boolean, "attr": "disabled" }, "doubleSlider": { "type": Boolean, "attr": "double-slider" }, "hideLabel": { "type": Boolean, "attr": "hide-label" }, "hideReferences": { "type": Boolean, "attr": "hide-references" }, "host": { "elementRef": true }, "initialValue": { "type": Number, "attr": "initial-value", "watchCallbacks": ["watchHandler"] }, "maximum": { "type": Number, "attr": "maximum" }, "minimum": { "type": Number, "attr": "minimum" }, "secondValue": { "state": true }, "value": { "state": true } }; }
    static get events() { return [{ "name": "singleSliderChanged", "method": "singleSliderChanged", "bubbles": true, "cancelable": true, "composed": true }, { "name": "doubleSliderChanged", "method": "doubleSliderChanged", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-slider:**/"; }
}
