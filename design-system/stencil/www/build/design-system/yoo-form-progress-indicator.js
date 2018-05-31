/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as getElementDimensions } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class YooFormProgressIndicatorComponent {
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
    static get properties() { return {
        "contextStep": {
            "state": true
        },
        "currentStep": {
            "type": Number,
            "attr": "current-step"
        },
        "host": {
            "elementRef": true
        },
        "isCompleted": {
            "type": Boolean,
            "attr": "is-completed"
        },
        "shownSteps": {
            "state": true
        },
        "steps": {
            "type": "Any",
            "attr": "steps"
        }
    }; }
    static get events() { return [{
            "name": "stepSelected",
            "method": "stepSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host yoo-context-menu /deep/.dropdown-content {\n  width: 11.25rem; }\n\n:host .progress-indicator-container {\n  position: relative;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  :host .progress-indicator-container .step-container {\n    cursor: pointer;\n    padding-right: 4.6875rem; }\n    :host .progress-indicator-container .step-container .step-title {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      min-width: 2rem;\n      width: 3.4375rem;\n      font-size: 1rem;\n      padding-bottom: 1em;\n      text-align: left; }\n    :host .progress-indicator-container .step-container .step-circle {\n      border-radius: 50%;\n      background-clip: padding-box;\n      /* stops bg color from leaking outside the border: */\n      background-color: var(--dark-10, #ececec);\n      color: var(--light, #FFFFFF);\n      font-size: 0.875rem;\n      padding: 4.5px 11.5px;\n      height: 30px;\n      width: 30px; }\n      :host .progress-indicator-container .step-container .step-circle.more {\n        padding: 5.5px 8.5px;\n        cursor: context-menu; }\n      :host .progress-indicator-container .step-container .step-circle.completed {\n        background-color: var(--dark-20, #dadada);\n        padding: 4.5px 0.5rem;\n        color: var(--accent, #1FB6FF); }\n      :host .progress-indicator-container .step-container .step-circle.current {\n        background-color: var(--accent, #1FB6FF); }\n    :host .progress-indicator-container .step-container .context-container span {\n      padding: 0.5rem 1rem;\n      line-height: 1.5;\n      width: 100%;\n      position: relative;\n      border-bottom: 1px solid var(--dark-20, #dadada); }\n      :host .progress-indicator-container .step-container .context-container span:last-child {\n        border-bottom: none; }\n      :host .progress-indicator-container .step-container .context-container span:hover {\n        background: var(--accent-05, #f4fbff);\n        color: var(--dark, #444); }\n      :host .progress-indicator-container .step-container .context-container span.context-current {\n        font-weight: bold; }\n      :host .progress-indicator-container .step-container .context-container span i {\n        position: absolute;\n        top: 12px;\n        right: 10px; }\n  :host .progress-indicator-container .progress-line {\n    position: absolute;\n    top: 3.3125rem;\n    margin-left: 1px;\n    z-index: -1;\n    height: 5px;\n    background-color: var(--dark-20, #dadada);\n    width: 8.45rem; }\n    :host .progress-indicator-container .progress-line.faded {\n      background-color: var(--dark-10, #ececec);\n      z-index: -2; }\n\n:host(.vertical) .progress-indicator-container {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  max-width: 2rem; }\n  :host(.vertical) .progress-indicator-container .step-container {\n    position: relative;\n    padding-bottom: 2.8125rem;\n    padding-right: 0rem; }\n    :host(.vertical) .progress-indicator-container .step-container .step-title {\n      position: relative;\n      top: 2.3125rem;\n      bottom: 0px;\n      left: 2.8125rem;\n      right: 0px; }\n    :host(.vertical) .progress-indicator-container .step-container .step-circle {\n      text-align: center;\n      padding: 4.5px 0.5px; }\n      :host(.vertical) .progress-indicator-container .step-container .step-circle.completed .completed-icon {\n        text-align: center; }\n  :host(.vertical) .progress-indicator-container .progress-line {\n    position: absolute;\n    top: 2.6875rem;\n    right: 14px;\n    z-index: -1;\n    width: 5px;\n    background-color: var(--dark-20, #dadada);\n    height: 8.45rem; }\n    :host(.vertical) .progress-indicator-container .progress-line.faded {\n      background-color: var(--dark-10, #ececec);\n      z-index: -2; }\n\n:host(.success) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--success, #2EDBB7); }\n\n:host(.success) .progress-indicator-container .step-container .step-circle.current {\n  background-color: var(--success, #2EDBB7); }\n\n:host(.danger) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--danger, #ff625f); }\n\n:host(.danger) .progress-indicator-container .step-container .step-circle.current {\n  background-color: var(--danger, #ff625f); }\n\n:host(.warning) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--warning, #ff6402); }\n\n:host(.warning) .progress-indicator-container .step-container .step-circle.current {\n  background-color: var(--warning, #ff6402); }\n\n:host(.info) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--info, #fc459e); }\n\n:host(.info) .progress-indicator-container .step-container .step-circle.current {\n  background-color: var(--info, #fc459e); }\n\n:host(.gradient-accent) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n:host(.gradient-accent) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n:host(.gradient-dark) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n:host(.gradient-dark) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n:host(.gradient-success) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n:host(.gradient-success) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n:host(.gradient-danger) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n:host(.gradient-danger) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n:host(.gradient-info) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n:host(.gradient-info) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n:host(.gradient-warning) .progress-indicator-container .step-container .step-circle.completed {\n  color: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n:host(.gradient-warning) .progress-indicator-container .step-container .step-circle.current {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }"; }
}

export { YooFormProgressIndicatorComponent as YooFormProgressIndicator };
