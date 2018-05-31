/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation } from './chunk-d3f1c80d.js';
import './chunk-a7525511.js';

class YooFabListComponent {
    constructor() {
        this.side = 'top';
        this.mini = false;
        this.activated = false;
        this.animated = false;
    }
    activatedChanged(activated) {
        if (this.animated) {
            this.animatedDisplay(activated);
        }
        else {
            this.nonAnimatedDisplay(activated);
        }
    }
    animatedDisplay(activated) {
        const yooBtns = this.host.querySelectorAll('.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutAnimated = 100;
        const buttonSize = 60;
        btnsArray.forEach(i => {
            setTimeout(() => {
                if (activated) {
                    yooBtns[i].classList.add('show');
                    setAnimation('fab', yooBtns[i], { distance: (buttonSize), direction: this.side, open: true });
                }
                else {
                    setAnimation('fab', yooBtns[i], { distance: (buttonSize), direction: this.side, open: false });
                    setTimeout(() => {
                        yooBtns[i].classList.remove('show');
                    }, 100);
                }
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, (this.activated ? (timeoutAnimated * i) : (timeoutAnimated * (yooBtns.length - i))));
        });
    }
    nonAnimatedDisplay(activated) {
        const yooBtns = this.host.querySelectorAll('.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutNotAnimated = activated ? 30 : 0;
        btnsArray.forEach(i => {
            setTimeout(() => {
                activated ? yooBtns[i].classList.add('show') : yooBtns[i].classList.remove('show');
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, timeoutNotAnimated * i);
        });
    }
    componentWillLoad() {
        this.host.classList.add(this.side);
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "yoo-fab-list"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated",
            "watchCallbacks": ["activatedChanged"]
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "host": {
            "elementRef": true
        },
        "mini": {
            "type": Boolean,
            "attr": "mini"
        },
        "side": {
            "type": String,
            "attr": "side"
        }
    }; }
    static get style() { return ":host {\n  position: absolute;\n  min-height: 2.625rem;\n  min-width: 2.625rem;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  top: 0; }\n  :host.right {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    left: 3.125rem; }\n    :host.right[mini] {\n      margin: 0.1875rem 0; }\n  :host.left {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    right: 3.125rem; }\n    :host.left[mini] {\n      margin: 0.1875rem 0; }\n  :host.top {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    top: auto;\n    bottom: 3.125rem;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse; }\n    :host.top[mini] {\n      margin: 0 0.25rem; }\n  :host.bottom {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    top: 3.125rem; }\n    :host.bottom[mini] {\n      margin: 0 0.25rem; }"; }
}

export { YooFabListComponent as YooFabList };
