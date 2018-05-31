/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooProgressBarComponent {
    constructor() {
        this.circle = false;
        this.hideProgress = false;
        this.maxValue = 100;
        this.percentage = false;
        this.triangleBackgroundColor = 'dark-10';
    }
    componentDidLoad() {
        if (this.host.classList.contains('triangle')) {
            this.updateTriangleStyle();
        }
    }
    updateTriangleStyle() {
        let width = 15;
        let progressMultiplier = (this.progress / this.maxValue) * 0.9;
        this.host.querySelector('.bar-container').setAttribute('style', `border-right: ${width}rem solid var(--${this.triangleBackgroundColor})`);
        this.host.querySelector('.progress-container').setAttribute('style', `border-right: ${(progressMultiplier * width) + 1.5}rem solid;
        border-top: ${(0.71875 * progressMultiplier) + 0.071875}rem solid transparent;
        border-bottom: ${(0.71875 * progressMultiplier) + 0.071875}rem solid transparent;`);
    }
    properProgress() {
        let prog;
        if (this.progress < 0) {
            prog = 0;
        }
        else if (this.progress > this.maxValue) {
            prog = 100;
        }
        else {
            prog = ((this.progress / this.maxValue) * 100);
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
        let clipped = this.host.className.includes('clipped-circle');
        let angle = Math.PI / 2 - ((2 * Math.PI * (prog / 100)) * (clipped ? 0.75 : 1));
        let y = 50 - 50 * Math.sin(angle);
        let x = 50 + 50 * Math.cos(angle);
        let positionTwo = '50% 0';
        let positionThree = '0 0';
        let positionFour = '0 100%';
        let postionFive = '100% 100%';
        let postionSix = '100% 0';
        if (prog <= (clipped ? 33.3333 : 25)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour} ${postionFive}, ${postionSix}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${postionSix}, ${x}% ${y}%`
            };
        }
        else if (prog <= (clipped ? 66.6666 : 50)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${x}% ${y}%`
            };
        }
        else if (prog <= (clipped ? 100 : 75)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${x}% ${y}%`
            };
        }
        else {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${x}% ${y}%`
            };
        }
    }
    render() {
        let progressStyle = Object.assign({}, this.properBorder(), { width: this.properProgress() + '%' });
        // let triangleStyle = 'border-right: 2rem solid blue';
        // let triangleStyle = {'border-right' : this.getTriangleWidth + 'rem solid', 'border-top': this.getTriangleHeight + 'rem solid transparent', 'border-bottom': this.getTriangleHeight + 'rem solid transparent'};
        return (this.circle ? (h("div", { class: "wrap", "attr-layout": "column", "attr-layout-align": "center center" },
            h("div", { class: "circle-outer-container", "attr-layout": "column" },
                h("div", { class: "circle-progress" }),
                h("div", { class: "circle-background", style: this.clipCoord() }),
                h("div", { class: "circle-center-container", "attr-layout": "row", "attr-layout-align": "center center" },
                    h("div", { class: "circle-center", "attr-layout": "column" },
                        this.hideProgress ? h("div", null) : h("div", { class: "circle-progress-label" }, (this.percentage ? `${this.properProgress().toFixed(0)}%` : this.progress)),
                        this.host.className.includes('large-circle') ? h("div", { class: "circle-title" }, this.circleTitle) : null)),
                this.host.className.includes('clipped-circle') ?
                    h("div", { class: "clipped-circle" })
                    : null),
            h("div", { class: "circle-label" }, this.host.className.includes('large-circle') ? this.circleLabel : this.circleTitle))) : (h("div", { class: 'outer-container', "attr-layout": "row" },
            h("div", { class: 'bar-container', "attr-layout": "row" },
                h("div", { class: 'progress-container', style: this.host.classList.contains('triangle') ? '' : progressStyle })),
            this.host.classList.contains('triangle') ? h("div", { class: "triangle-cover" }) : null,
            this.hideProgress ? h("div", null) : h("span", { class: "label" }, (this.percentage ? `${this.properProgress().toFixed(0)}%` : this.progress)))));
    }
    static get is() { return "yoo-progress-bar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "circle": {
            "type": Boolean,
            "attr": "circle"
        },
        "circleLabel": {
            "type": String,
            "attr": "circle-label"
        },
        "circleTitle": {
            "type": String,
            "attr": "circle-title"
        },
        "hideProgress": {
            "type": Boolean,
            "attr": "hide-progress"
        },
        "host": {
            "elementRef": true
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "percentage": {
            "type": Boolean,
            "attr": "percentage"
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        },
        "triangleBackgroundColor": {
            "type": String,
            "attr": "triangle-background-color"
        }
    }; }
    static get style() { return ".rounded[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-radius: 0.675rem; }\n  .rounded[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    border-top-left-radius: 0.675rem;\n    border-bottom-left-radius: 0.675rem; }\n\n[data-yoo-progress-bar-host] {\n  display: inline-block;\n  width: 100%; }\n  [data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar] {\n    position: relative;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    [data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .bar-container[data-yoo-progress-bar] {\n      display: inline-block;\n      width: 100%;\n      height: 3px;\n      background-color: var(--dark-10, #ececec);\n      vertical-align: middle; }\n      [data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n        width: 100%;\n        height: 3px; }\n    [data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .label[data-yoo-progress-bar] {\n      color: var(--dark, #444);\n      padding-left: 0.5rem;\n      font-size: 0.75rem !important; }\n\n.small[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  width: 5rem !important;\n  height: 0.5rem !important; }\n  .small[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    height: 0.5rem !important; }\n\n.xsmall[data-yoo-progress-bar-host] {\n  display: block; }\n  .xsmall[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar] {\n    margin-top: 0; }\n  .xsmall[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n    height: 0.0625rem !important; }\n    .xsmall[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n      height: 0.0625rem !important; }\n  .xsmall[data-yoo-progress-bar-host]   .label[data-yoo-progress-bar] {\n    font-weight: 400;\n    font-size: 0.625rem !important;\n    padding-left: 0.9375rem; }\n\n[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar] {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start; }\n  [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar] {\n    position: relative; }\n    [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n      height: 4.125rem;\n      width: 4.125rem;\n      border-radius: 50%;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      z-index: 0; }\n    [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-background[data-yoo-progress-bar] {\n      background: var(--dark-10, #ececec);\n      height: 4.125rem;\n      width: 4.125rem;\n      border-radius: 50%;\n      position: absolute;\n      top: 0rem;\n      left: 0rem;\n      z-index: 1000; }\n    [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar] {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 4.125rem;\n      width: 4.125rem; }\n      [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n        height: 4rem;\n        width: 4rem;\n        border-radius: 50%;\n        background: var(--light, #FFFFFF);\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        z-index: 3000; }\n        [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar]   .circle-progress-label[data-yoo-progress-bar] {\n          font-size: 1.25rem !important;\n          color: var(--dark, #444);\n          font-weight: 300; }\n        [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar]   .circle-title[data-yoo-progress-bar] {\n          color: var(--dark, #444); }\n    [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .clipped-circle[data-yoo-progress-bar] {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 4.125rem;\n      width: 4.125rem;\n      z-index: 2000;\n      border-radius: 50%;\n      -webkit-clip-path: polygon(50% 50%, 100% 100%, 0 100%);\n              clip-path: polygon(50% 50%, 100% 100%, 0 100%);\n      background-color: var(--light, #FFFFFF); }\n  [data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-label[data-yoo-progress-bar] {\n    font-size: 0.625rem;\n    text-transform: uppercase;\n    letter-spacing: 0.0625rem;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    padding-top: 0.625rem; }\n  [data-yoo-progress-bar-host]   .wrap.full[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: transparent !important; }\n\n.flipped[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .bar-container[data-yoo-progress-bar] {\n  -webkit-transform: scaleX(-1);\n          transform: scaleX(-1); }\n\n.flipped[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-background[data-yoo-progress-bar] {\n  -webkit-transform: scaleX(-1);\n          transform: scaleX(-1); }\n\n.large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  height: 13.75rem;\n  width: 13.75rem; }\n\n.large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-background[data-yoo-progress-bar] {\n  height: 13.75rem;\n  width: 13.75rem; }\n\n.large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar] {\n  height: 13.75rem;\n  width: 13.75rem; }\n  .large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    height: 13rem;\n    width: 13rem; }\n    .large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar]   .circle-progress-label[data-yoo-progress-bar] {\n      font-size: 3.75rem !important;\n      line-height: 1.15; }\n    .large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-center-container[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar]   .circle-title[data-yoo-progress-bar] {\n      font-size: 0.875rem;\n      text-transform: uppercase;\n      letter-spacing: 0.0625rem; }\n\n.large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .clipped-circle[data-yoo-progress-bar] {\n  height: 13.75rem;\n  width: 13.75rem; }\n\n.large-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-label[data-yoo-progress-bar] {\n  text-transform: none;\n  letter-spacing: normal;\n  font-size: 0.875rem;\n  text-align: center;\n  width: 8.6875rem;\n  color: var(--text-color, #807f83); }\n\n.clipped-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar] {\n  position: relative;\n  height: 15.625rem; }\n  .clipped-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n    -webkit-clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%, 50% 50%);\n            clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%, 50% 50%); }\n  .clipped-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-outer-container[data-yoo-progress-bar]   .circle-background[data-yoo-progress-bar] {\n    -webkit-transform: rotate(-135deg);\n    transform: rotate(-135deg); }\n  .clipped-circle[data-yoo-progress-bar-host]   .wrap[data-yoo-progress-bar]   .circle-label[data-yoo-progress-bar] {\n    position: absolute;\n    z-index: 5000;\n    bottom: 0; }\n\n.accent[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--accent, #1FB6FF); }\n  .accent[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.dark[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--dark-40, #b4b4b4); }\n  .dark[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--dark-40, #b4b4b4); }\n  .dark[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.info[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--info, #fc459e); }\n  .info[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--info, #fc459e); }\n\n.info[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--info, #fc459e); }\n  .info[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.success[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--success, #2EDBB7); }\n  .success[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--success, #2EDBB7); }\n\n.success[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--success, #2EDBB7); }\n  .success[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.danger[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--danger, #ff625f); }\n  .danger[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--danger, #ff625f); }\n\n.danger[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--danger, #ff625f); }\n  .danger[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.warning[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--warning, #ff6402); }\n  .warning[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--warning, #ff6402); }\n\n.warning[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--warning, #ff6402); }\n  .warning[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  .gradient-accent[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  .gradient-accent[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  .gradient-dark[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  .gradient-dark[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  .gradient-info[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  .gradient-info[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  .gradient-success[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  .gradient-success[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  .gradient-danger[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  .gradient-danger[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar] {\n  border-color: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  .gradient-warning[data-yoo-progress-bar-host]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n    background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  .gradient-warning[data-yoo-progress-bar-host]   .circle-outer-container[data-yoo-progress-bar]   .circle-progress[data-yoo-progress-bar]   .circle-center[data-yoo-progress-bar] {\n    background: var(--light, #FFFFFF); }\n\n.triangle[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar] {\n  position: relative; }\n  .triangle[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .bar-container[data-yoo-progress-bar] {\n    width: 0;\n    height: 0;\n    border-top: 0.71875rem solid transparent;\n    border-bottom: 0.71875rem solid transparent;\n    background-color: transparent;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    .triangle[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .bar-container[data-yoo-progress-bar]   .progress-container[data-yoo-progress-bar] {\n      background-color: transparent;\n      width: 0;\n      height: 0; }\n  .triangle[data-yoo-progress-bar-host]   .outer-container[data-yoo-progress-bar]   .triangle-cover[data-yoo-progress-bar] {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 1.5rem;\n    background-color: var(--light, #FFFFFF); }"; }
}

export { YooProgressBarComponent as YooProgressBar };
