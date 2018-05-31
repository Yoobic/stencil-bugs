export class YooProgressBarComponent {
    constructor() {
        this.circle = false;
        this.hideProgress = false;
    }
    properProgress() {
        let prog;
        if (this.progress < 0) {
            prog = 0;
        }
        else if (this.progress > 100) {
            prog = 100;
        }
        else {
            prog = this.progress;
        }
        return prog;
    }
    properBorder() {
        if (this.progress < 97) {
            return {};
        }
        else {
            return { 'border-top-right-radius': '0.675rem', 'border-bottom-right-radius': '0.675rem' };
        }
    }
    clipCoord() {
        let prog = this.properProgress();
        let angle = Math.PI / 2 - 2 * Math.PI * (prog / 100);
        let y = 50 - 50 * Math.sin(angle);
        let x = 50 + 50 * Math.cos(angle);
        if (prog <= 25) {
            return {
                'clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% 0, ' + x + '%' + y + '%)',
                '-webkit-clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% 0, ' + x + '%' + y + '%)'
            };
        }
        else if (prog <= 50) {
            return {
                'clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, ' + x + '%' + y + '%)',
                '-webkit-clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, ' + x + '%' + y + '%)'
            };
        }
        else if (prog <= 75) {
            return {
                'clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, ' + x + '%' + y + '%)',
                '-webkit-clip-path': 'polygon(50% 50%, 50% 0, 0 0, 0 100%, ' + x + '%' + y + '%)'
            };
        }
        else {
            return {
                'clip-path': 'polygon(50% 50%, 50% 0, 0 0, ' + x + '%' + y + '%)',
                '-webkit-clip-path': 'polygon(50% 50%, 50% 0, 0 0, ' + x + '%' + y + '%)'
            };
        }
    }
    render() {
        let progressStyle = Object.assign({}, this.properBorder(), { width: this.properProgress() + '%' });
        return (this.circle ? (h("div", { class: "circle-outer-container" },
            h("div", { class: "circle-progress" },
                h("div", { class: "circle-center" }, this.hideProgress ? h("div", null) : h("span", { class: "circle-label" },
                    this.progress,
                    "%"))),
            h("div", { class: "circle-background", style: this.clipCoord() }))) : (h("div", { class: "outer-container", "attr-layout": "row" },
            h("div", { class: "bar-container" },
                h("div", { class: "progress-container", style: progressStyle })),
            this.hideProgress ? h("div", null) : h("span", { class: "label" },
                this.progress,
                "%"))));
    }
    static get is() { return "yoo-progress-bar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "circle": { "type": Boolean, "attr": "circle" }, "hideProgress": { "type": Boolean, "attr": "hide-progress" }, "progress": { "type": Number, "attr": "progress" } }; }
    static get style() { return "/**style-placeholder:yoo-progress-bar:**/"; }
}
