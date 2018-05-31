/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation, b as animations } from './chunk-d3f1c80d.js';
import './chunk-a7525511.js';

class YooAccordionComponent {
    constructor() {
        this.titles = ['accordion1'];
        this.items = [];
        this.animationRequiredAfterRender = false;
    }
    titlesHandler() {
        this.itemsReset();
    }
    itemsReset() {
        this.items = this.titles.map((item, index) => {
            if (this.host.querySelectorAll('.selected-accordion')[index]) {
                this.fadeAccordionContent('0', 0, index);
            }
            return { title: item, selected: false };
        });
    }
    onAccordionClick(index) {
        if (this.items[index].selected === true && !this.allowMultipleSelection) {
            this.fadeAccordionContent('0', 0, 0);
            this.animateTransition(index, true);
            this.itemsReset();
        }
        else {
            this.selectedIndex = index;
            if (!this.allowMultipleSelection) {
                this.items.map((o, i) => {
                    if (o.selected) {
                        this.previousSelectedIndex = i;
                    }
                });
                this.animationRequiredAfterRender = true;
                this.itemsReset();
                this.items[index].selected = !this.items[index].selected;
            }
            else {
                this.items = this.items.map((obj, index2) => {
                    if (index === index2) {
                        obj.selected ? (this.fadeAccordionContent('0', 0, 0), this.animateTransition(index, true)) : (this.animationRequiredAfterRender = true);
                        return { title: obj.title, selected: !obj.selected };
                    }
                    else {
                        return obj;
                    }
                });
            }
        }
        this.accordionSelected.emit(index);
    }
    fadeAccordionContent(opacity, timeout, index) {
        let selected = this.allowMultipleSelection ? this.host.querySelector(`#${this.items[this.selectedIndex].title}`) : this.host.querySelectorAll('.selected-accordion')[index];
        if (selected) {
            setTimeout(() => {
                selected.setAttribute('style', `opacity: ${opacity};`);
            }, timeout);
        }
    }
    animateTransition(index, up) {
        let distance = this.host.querySelector('.selected-accordion').clientHeight;
        let count = 0;
        this.items.map((_o, i) => {
            if (this.previousSelectedIndex > this.selectedIndex) {
                const animationNumber = this.previousSelectedIndex - this.selectedIndex;
                if (i > this.selectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], { up: false, distance: distance, open: true });
                    count = count + 1;
                }
            }
            else if (this.selectedIndex > this.previousSelectedIndex && (this.previousSelectedIndex !== null)) {
                const animationNumber = this.selectedIndex - this.previousSelectedIndex;
                if (i > this.previousSelectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], { up: true, distance: distance, open: true });
                    count = count + 1;
                }
            }
            else {
                if (i > index) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], { up: up, distance: distance, open: true });
                }
            }
        });
    }
    componentWillLoad() {
        this.itemsReset();
    }
    componentDidUpdate() {
        if (this.animationRequiredAfterRender) {
            this.fadeAccordionContent('1', 150, 0);
            this.animateTransition(this.selectedIndex, false);
        }
        this.animationRequiredAfterRender = false;
        this.selectedIndex = null;
        this.previousSelectedIndex = null;
    }
    render() {
        return (h("div", { class: "outer-container" }, this.items.map((obj, index) => h("div", { class: "accordion-selector" },
            h("div", { class: 'accordion-title ' + (this.items[index].selected ? 'active-title' : ''), onClick: () => this.onAccordionClick(index), "attr-layout": "row", "attr-layout-align": "space-between" },
                h("span", { class: "text" }, obj.title),
                h("span", { class: "icon" },
                    h("i", { class: this.items[index].selected ? 'yo-minus' : 'yo-plus' }))),
            h("div", { class: this.items[index].selected ? 'selected-accordion' : 'undisplayed-accordion', id: obj.title },
                h("slot", { name: obj.title }))))));
    }
    static get is() { return "yoo-accordion"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "allowMultipleSelection": {
            "type": Boolean,
            "attr": "allow-multiple-selection"
        },
        "host": {
            "elementRef": true
        },
        "items": {
            "state": true
        },
        "titles": {
            "type": "Any",
            "attr": "titles",
            "watchCallbacks": ["titlesHandler"]
        }
    }; }
    static get events() { return [{
            "name": "accordionSelected",
            "method": "accordionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  background: var(--light, #FFFFFF);\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s; }\n  :host .outer-container .accordion-selector {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start; }\n    :host .outer-container .accordion-selector .accordion-title {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      width: 100%;\n      padding-left: 0.5rem;\n      padding-right: 1rem;\n      vertical-align: middle; }\n      :host .outer-container .accordion-selector .accordion-title .text {\n        padding: 0.5rem; }\n      :host .outer-container .accordion-selector .accordion-title .icon {\n        padding: 0.5rem;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s; }\n    :host .outer-container .accordion-selector .accordion-title:hover {\n      cursor: pointer; }\n    :host .outer-container .accordion-selector .accordion-title.active-title .icon {\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s; }\n    :host .outer-container .accordion-selector .undisplayed-accordion {\n      display: none; }\n    :host .outer-container .accordion-selector .selected-accordion {\n      display: block;\n      margin-left: 1.5rem;\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n      color: var(--dark, #444);\n      opacity: 0; }\n\n:host(.accent) .outer-container {\n  border-color: var(--accent, #1FB6FF); }\n  :host(.accent) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--accent, #1FB6FF); }\n    :host(.accent) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--accent, #1FB6FF); }\n\n:host(.danger) .outer-container {\n  border-color: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--danger, #ff625f); }\n    :host(.danger) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--danger, #ff625f); }\n\n:host(.success) .outer-container {\n  border-color: var(--success, #2EDBB7); }\n  :host(.success) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--success, #2EDBB7); }\n    :host(.success) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--success, #2EDBB7); }\n\n:host(.info) .outer-container {\n  border-color: var(--info, #fc459e); }\n  :host(.info) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--info, #fc459e); }\n    :host(.info) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--info, #fc459e); }\n\n:host(.warning) .outer-container {\n  border-color: var(--warning, #ff6402); }\n  :host(.warning) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--warning, #ff6402); }\n    :host(.warning) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--warning, #ff6402); }\n\n:host(.dark) .outer-container {\n  border-color: var(--dark-40, #b4b4b4); }\n  :host(.dark) .outer-container .accordion-selector .accordion-title {\n    border-color: var(--dark-40, #b4b4b4); }\n    :host(.dark) .outer-container .accordion-selector .accordion-title .icon {\n      color: var(--dark-40, #b4b4b4); }\n\n:host(.accent-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #097be5, #87bbfd);\n     border-image: -webkit-gradient(linear, left top, right top, from(#097be5), to(#87bbfd));\n     border-image: linear-gradient(to right, #097be5, #87bbfd);\n  border-image-slice: 1; }\n  :host(.accent-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #097be5, #87bbfd);\n       border-image: -webkit-gradient(linear, left top, right top, from(#097be5), to(#87bbfd));\n       border-image: linear-gradient(to right, #097be5, #87bbfd);\n    border-image-slice: 1; }\n    :host(.accent-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.accent-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#097be5, #87bbfd);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }\n\n:host(.danger-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #f76c6c, #febd3c);\n     border-image: -webkit-gradient(linear, left top, right top, from(#f76c6c), to(#febd3c));\n     border-image: linear-gradient(to right, #f76c6c, #febd3c);\n  border-image-slice: 1; }\n  :host(.danger-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #f76c6c, #febd3c);\n       border-image: -webkit-gradient(linear, left top, right top, from(#f76c6c), to(#febd3c));\n       border-image: linear-gradient(to right, #f76c6c, #febd3c);\n    border-image-slice: 1; }\n    :host(.danger-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.danger-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#f76c6c, #febd3c);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }\n\n:host(.success-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #44c3aa, #87bbfd);\n     border-image: -webkit-gradient(linear, left top, right top, from(#44c3aa), to(#87bbfd));\n     border-image: linear-gradient(to right, #44c3aa, #87bbfd);\n  border-image-slice: 1; }\n  :host(.success-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #44c3aa, #87bbfd);\n       border-image: -webkit-gradient(linear, left top, right top, from(#44c3aa), to(#87bbfd));\n       border-image: linear-gradient(to right, #44c3aa, #87bbfd);\n    border-image-slice: 1; }\n    :host(.success-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.success-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#44c3aa, #87bbfd);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }\n\n:host(.info-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #6f3cfe, #f564b6);\n     border-image: -webkit-gradient(linear, left top, right top, from(#6f3cfe), to(#f564b6));\n     border-image: linear-gradient(to right, #6f3cfe, #f564b6);\n  border-image-slice: 1; }\n  :host(.info-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #6f3cfe, #f564b6);\n       border-image: -webkit-gradient(linear, left top, right top, from(#6f3cfe), to(#f564b6));\n       border-image: linear-gradient(to right, #6f3cfe, #f564b6);\n    border-image-slice: 1; }\n    :host(.info-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.info-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#6f3cfe, #f564b6);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }\n\n:host(.warning-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #EEC852, #f5cfb5);\n     border-image: -webkit-gradient(linear, left top, right top, from(#EEC852), to(#f5cfb5));\n     border-image: linear-gradient(to right, #EEC852, #f5cfb5);\n  border-image-slice: 1; }\n  :host(.warning-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #EEC852, #f5cfb5);\n       border-image: -webkit-gradient(linear, left top, right top, from(#EEC852), to(#f5cfb5));\n       border-image: linear-gradient(to right, #EEC852, #f5cfb5);\n    border-image-slice: 1; }\n    :host(.warning-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.warning-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#EEC852, #f5cfb5);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }\n\n:host(.dark-gradient) .outer-container {\n  -o-border-image: linear-gradient(to right, #3a4361, #097be5);\n     border-image: -webkit-gradient(linear, left top, right top, from(#3a4361), to(#097be5));\n     border-image: linear-gradient(to right, #3a4361, #097be5);\n  border-image-slice: 1; }\n  :host(.dark-gradient) .outer-container .accordion-selector .accordion-title {\n    -o-border-image: linear-gradient(to right, #3a4361, #097be5);\n       border-image: -webkit-gradient(linear, left top, right top, from(#3a4361), to(#097be5));\n       border-image: linear-gradient(to right, #3a4361, #097be5);\n    border-image-slice: 1; }\n    :host(.dark-gradient) .outer-container .accordion-selector .accordion-title .icon,\n    :host(.dark-gradient) .outer-container .accordion-selector .accordion-title .text {\n      background-image: -webkit-linear-gradient(#3a4361, #097be5);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent; }"; }
}

export { YooAccordionComponent as YooAccordion };
