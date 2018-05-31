/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFabContainerComponent {
    constructor() {
        this.animated = false;
        this.activated = false;
        this.toggleActive = () => {
            this.activated = !this.activated;
        };
    }
    render() {
        // select the button that triggers the list
        const fabBtn = this.host.querySelector('yoo-fab-button');
        fabBtn.toggleActive = this.toggleActive;
        fabBtn.activated = this.activated;
        const fabLists = this.host.querySelectorAll('yoo-fab-list');
        fabBtn.parentHasList = (fabLists.length > 0);
        // Propagate the activated prop to all lists
        for (let i = 0; i < fabLists.length; i++) {
            fabLists[i].activated = this.activated;
            fabLists[i].animated = this.animated;
        }
        return (h("slot", null));
    }
    static get is() { return "yoo-fab-container"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activated": {
            "state": true
        },
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "[data-yoo-fab-container-host] {\n  position: absolute;\n  z-index: 1000; }\n  [top][data-yoo-fab-container-host] {\n    top: 0.625rem; }\n  [bottom][data-yoo-fab-container-host] {\n    bottom: 0.625rem; }\n  [middle][data-yoo-fab-container-host] {\n    top: 50%;\n    margin-top: -1.3125rem; }\n  [center][data-yoo-fab-container-host] {\n    left: 50%;\n    margin-left: -1.3125rem; }\n  [right][data-yoo-fab-container-host] {\n    right: 0.625rem; }\n  [left][data-yoo-fab-container-host] {\n    left: 0.625rem; }"; }
}

export { YooFabContainerComponent as YooFabContainer };
