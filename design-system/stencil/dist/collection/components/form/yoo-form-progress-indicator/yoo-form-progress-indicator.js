import { getElementDimensions } from '../../../utils/helpers';
export class YooFormProgressIndicatorComponent {
    constructor() {
        this.MAX_STEPS = 7;
        this.STEP_SIZE = 135;
        this.steps = [];
        this.isCompleted = false;
        this.shownSteps = 7;
        // Index position for the context menu
        this.contextStep = this.shownSteps - 2;
    }
    selectStep(event, step) {
        if (event) {
            this.stepSelected.emit(step);
        }
    }
    componentWillLoad() {
        // check on load
        this.setStepNumber();
        // check on resize
        // check the body width here and set max steps accordingly
        window.addEventListener('resize', () => this.setStepNumber());
    }
    setStepNumber() {
        let dimensions = getElementDimensions(this.host.parentElement);
        let width = dimensions.width;
        let height = dimensions.height;
        if (this.host.classList.contains('vertical')) {
            this.shownSteps = Math.min(Math.floor(height / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        else {
            this.shownSteps = Math.min(Math.floor(width / this.STEP_SIZE), this.MAX_STEPS - 1);
        }
        this.contextStep = this.shownSteps - 1;
    }
    // TO DO: fix BLUR Event
    // blurMenu(event: UIEvent) {
    //     if (event) {
    //         console.log('El', this.el);
    //         this.el.querySelector('yoo-context-menu').close();
    //     }
    // }
    isCollapsed() {
        return this.steps.length > this.shownSteps + 1;
    }
    isCompletedStep(step) {
        let index = this.steps.indexOf(step);
        return index < this.currentStep;
    }
    isContextStep(index) {
        return index === this.contextStep;
    }
    isContextMenuCompleted() {
        // Mark context menu as complete if the last step is the current step
        return this.currentStep === this.steps.length - 1;
    }
    isCurrentStep(step) {
        let index = this.steps.indexOf(step);
        return index === this.currentStep;
    }
    isLastStep(step) {
        let index = this.steps.indexOf(step);
        return index === this.steps.length - 1;
    }
    renderCompletedIndicator() {
        return (this.visibleSteps.map((step, index) => h("div", { class: "step-container" },
            h("div", { class: "step-title" },
                h("span", null, step)),
            this.isContextStep(index) && this.isCollapsed() ?
                this.renderContextMenu()
                : h("div", { class: "step-circle completed", onClick: (event) => this.selectStep(event, step) },
                    h("span", { class: "completed-icon" },
                        h("i", { class: "yo-check" }))),
            (index < this.visibleSteps.length - 1 ? h("div", { class: "progress-line" }) : null))));
    }
    renderContextMenu() {
        return ((this.isCompleted || this.isContextMenuCompleted() ?
            h("yoo-context-menu", null,
                h("div", { slot: "trigger", class: "step-circle completed" },
                    h("span", { class: "completed-icon" },
                        h("i", { class: "yo-more" }))),
                h("div", { class: "context-container", "attr-layout": "column" }, this.collapsedSteps.map((step) => h("span", { onClick: (event) => this.selectStep(event, step) },
                    step,
                    h("i", { class: "yo-check" })))))
            : h("yoo-context-menu", null,
                h("div", { slot: "trigger", class: 'step-circle ' + (this.collapsedSteps.indexOf(this.steps[this.currentStep]) !== -1 ? 'current ' : ' ') + 'more' },
                    h("span", null,
                        h("i", { class: "yo-more" }))),
                h("div", { class: "context-container", "attr-layout": "column" }, this.collapsedSteps.map((step) => h("span", { class: this.isCurrentStep(step) ? 'context-current' : '', onClick: (event) => this.selectStep(event, step) },
                    step,
                    this.isCompletedStep(step) ? h("i", { class: "yo-check" }) : null))))));
    }
    renderStepContainer(step, index, lastStep) {
        return (h("div", { class: "step-container" },
            h("div", { class: "step-title" },
                h("span", null, step)),
            (this.isContextStep(index) && this.isCollapsed() ? this.renderContextMenu()
                : (this.isCompletedStep(step) ? h("div", { class: "step-circle completed", onClick: (event) => this.selectStep(event, step) },
                    h("span", { class: "completed-icon" },
                        h("i", { class: "yo-check" })))
                    : h("div", { class: 'step-circle ' + (this.isCurrentStep(step) ? 'current' : ''), onClick: (event) => this.selectStep(event, step) },
                        h("span", null, this.isLastStep(step) ? this.steps.length : index + 1)))),
            (index < this.visibleSteps.length - 1 ? (this.isContextStep(index) ?
                h("div", { class: 'progress-line ' + (this.isCurrentStep(lastStep) ? '' : 'faded') })
                : h("div", { class: 'progress-line ' + (!this.isCompletedStep(step) ? 'faded' : '') })) : null)));
    }
    render() {
        let lastStep = this.steps[this.steps.length - 1];
        // Collapse Items include all steps after the Context-Index (included) except for the last step
        this.collapsedSteps = this.steps.slice(this.contextStep, this.steps.length - 1);
        if (this.isCollapsed()) {
            this.visibleSteps = this.steps.slice(0, this.contextStep + 1);
            this.visibleSteps.push(lastStep);
        }
        else {
            this.visibleSteps = this.steps;
        }
        return (h("div", { "attr-layout": "row", class: "progress-indicator-container" }, this.isCompleted ? this.renderCompletedIndicator() :
            this.visibleSteps.map((step, index) => this.renderStepContainer(step, index, lastStep))));
    }
    static get is() { return "yoo-form-progress-indicator"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "contextStep": { "state": true }, "currentStep": { "type": Number, "attr": "current-step" }, "host": { "elementRef": true }, "isCompleted": { "type": Boolean, "attr": "is-completed" }, "shownSteps": { "state": true }, "steps": { "type": "Any", "attr": "steps" } }; }
    static get events() { return [{ "name": "stepSelected", "method": "stepSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-progress-indicator:**/"; }
}
