/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFormChecklistComponent {
    constructor() {
        this.previousTasks = [];
        this.tasks = [];
    }
    onInputBlurred(ev) {
        let task = ev.detail && ev.detail.target && ev.detail.target.value;
        this.tasks = [...this.tasks, task];
        const inputEl = this.host.shadowRoot.querySelector('input');
        inputEl.value = null;
    }
    render() {
        return (h("div", { class: "container" },
            h("div", { class: "tasks" }, this.previousTasks.map((task) => h("div", { class: "task" }, task))),
            h("div", { class: "input" },
                h("yoo-form-input", { onInputBlurred: (event) => this.onInputBlurred(event) })),
            h("div", { class: "tasks" }, this.tasks.map((task) => h("div", { class: "task" }, task)))));
    }
    static get is() { return "yoo-form-checklist"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "previousTasks": {
            "type": "Any",
            "attr": "previous-tasks"
        },
        "tasks": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

export { YooFormChecklistComponent as YooFormChecklist };
