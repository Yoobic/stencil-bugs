import signature_pad from 'signature_pad';
export class YooSignaturePadComponent {
    componentDidLoad() {
        this.canvasSetup();
    }
    canvasSetup() {
        let canvas = this.host.querySelector('canvas');
        let ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = this.host.querySelector('.container').clientWidth;
        canvas.height = this.host.querySelector('.container').clientHeight;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad = new signature_pad(canvas, { backgroundColor: '#ffffff', penColor: '#000000' });
    }
    onClear() {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
    }
    render() {
        return [
            h("div", { class: "container" },
                h("canvas", null)),
            h("div", { class: "link", onClick: this.onClear.bind(this) }, "Clear")
        ];
    }
    static get is() { return "yoo-signature-pad"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true } }; }
    static get style() { return "/**style-placeholder:yoo-signature-pad:**/"; }
}
