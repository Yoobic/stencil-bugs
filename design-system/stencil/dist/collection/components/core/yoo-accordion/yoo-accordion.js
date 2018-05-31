import { setAnimation, animations } from '../../../utils/anim';
export class YooAccordionComponent {
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
            if (this._host.querySelectorAll('.selected-accordion')[index]) {
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
        let selected = this.allowMultipleSelection ? this._host.querySelector(`#${this.items[this.selectedIndex].title}`) : this._host.querySelectorAll('.selected-accordion')[index];
        if (selected) {
            setTimeout(() => {
                selected.setAttribute('style', `opacity: ${opacity};`);
            }, timeout);
        }
    }
    animateTransition(index, up) {
        let distance = this._host.querySelector('.selected-accordion').clientHeight;
        let count = 0;
        this.items.map((_o, i) => {
            if (this.previousSelectedIndex > this.selectedIndex) {
                const animationNumber = this.previousSelectedIndex - this.selectedIndex;
                if (i > this.selectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this._host.querySelectorAll('.accordion-selector')[i], { up: false, distance: distance });
                    count = count + 1;
                }
            }
            else if (this.selectedIndex > this.previousSelectedIndex && (this.previousSelectedIndex !== null)) {
                const animationNumber = this.selectedIndex - this.previousSelectedIndex;
                if (i > this.previousSelectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this._host.querySelectorAll('.accordion-selector')[i], { up: true, distance: distance });
                    count = count + 1;
                }
            }
            else {
                if (i > index) {
                    setAnimation(animations.slideVertical, this._host.querySelectorAll('.accordion-selector')[i], { up: up, distance: distance });
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
    static get properties() { return { "_host": { "elementRef": true }, "allowMultipleSelection": { "type": Boolean, "attr": "allow-multiple-selection" }, "items": { "state": true }, "titles": { "type": "Any", "attr": "titles", "watchCallbacks": ["titlesHandler"] } }; }
    static get events() { return [{ "name": "accordionSelected", "method": "accordionSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-accordion:**/"; }
}
