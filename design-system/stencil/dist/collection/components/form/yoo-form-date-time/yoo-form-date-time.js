import flatpickr from 'flatpickr';
export class YooFormDateTimeComponent {
    componentDidLoad() {
        flatpickr(this.host, {});
    }
    render() {
        return (h("yoo-form-input", { placeholder: this.placeholder, placeholdertolabel: this.placeholdertolabel, required: this.required, "icon-prefix": "yo-calendar" }));
    }
    static get is() { return "yoo-form-date-time"; }
    static get properties() { return { "host": { "elementRef": true }, "placeholder": { "type": String, "attr": "placeholder" }, "placeholdertolabel": { "type": Boolean, "attr": "placeholdertolabel" }, "required": { "type": Boolean, "attr": "required" } }; }
    static get style() { return "/**style-placeholder:yoo-form-date-time:**/"; }
}
