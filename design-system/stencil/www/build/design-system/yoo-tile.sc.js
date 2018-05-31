/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooTileComponent {
    render() {
        return (h("div", { class: "outer-container" },
            (this.icon ? h("div", { class: "tile-icon" },
                h("i", { class: this.icon })) : null),
            h("div", { class: "tile-value" }, this.value),
            h("div", { class: 'tile-text ' + (this.textClass) }, this.text)));
    }
    static get is() { return "yoo-tile"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "textClass": {
            "type": String,
            "attr": "text-class"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return "[data-yoo-tile-host]   .outer-container[data-yoo-tile] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 10.3125rem;\n  height: 8.125rem;\n  background-color: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  border-radius: 0.5rem;\n  padding: 0.96875rem 1.25rem; }\n  [data-yoo-tile-host]   .outer-container[data-yoo-tile]   .tile-text[data-yoo-tile] {\n    font-size: 0.625rem;\n    margin-top: 0.34375rem;\n    line-height: 0.75rem; }\n  [data-yoo-tile-host]   .outer-container[data-yoo-tile]   .tile-value[data-yoo-tile] {\n    font-size: 2.25rem;\n    font-weight: 300;\n    line-height: 2.75rem; }"; }
}

export { YooTileComponent as YooTile };
