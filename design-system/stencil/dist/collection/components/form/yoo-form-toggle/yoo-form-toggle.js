import { setAnimation, animations } from '../../../utils/anim';
export class YooFormToggleComponent {
    constructor() {
        this.isToggled = false;
    }
    onToggle() {
        setAnimation(animations.slideHorizontal, this.host.querySelector('.inner-container'), { open: (this.isToggled ? false : true), distance: 30 });
        this.isToggled = !this.isToggled;
        this.toggled.emit(this.isToggled);
    }
    render() {
        return (h("div", { class: 'outer-container' + (this.isToggled ? ' active' : ''), "attr-layout": "row", onClick: () => this.onToggle() },
            h("div", { class: 'inner-container' + (this.isToggled ? ' active' : '') })));
    }
    static get is() { return "yoo-form-toggle"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true }, "isToggled": { "state": true } }; }
    static get events() { return [{ "name": "toggled", "method": "toggled", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-toggle:**/"; }
}
