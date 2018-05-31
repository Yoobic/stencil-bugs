import { Component, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { getElementDimensions } from '../../../utils/helpers';

@Component({
    tag: 'yoo-form-progress-indicator',
    styleUrl: 'form-progress-indicator.scss',
    scoped: true
})
export class YooFormProgressIndicatorComponent {

    MAX_STEPS = 7;
    STEP_SIZE = 135;

    @Prop() steps: string[] = [];
    @Prop() currentStep: number;
    @Prop() isCompleted: boolean = false;

    @Event() stepSelected: EventEmitter<string>;

    @State() shownSteps = 7;
    // Index position for the context menu
    @State() contextStep = this.shownSteps - 2;

     @Element() host: HTMLStencilElement;

    private collapsedSteps: string[];
    private visibleSteps: string[];

    selectStep(event: UIEvent, step: string): void {
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

    setStepNumber(): void {
        let dimensions = getElementDimensions(this.host.parentElement);
        let width = dimensions.width;
        let height = dimensions.height;

        if (this.host.classList.contains('vertical')) {
            this.shownSteps = Math.min(Math.floor(height / this.STEP_SIZE), this.MAX_STEPS - 1);
        } else {
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

    isCollapsed(): boolean {
        return this.steps.length > this.shownSteps + 1;
    }

    isCompletedStep(step: string): boolean {
        let index = this.steps.indexOf(step);
        return index < this.currentStep;
    }

    isContextStep(index: number): boolean {
        return index === this.contextStep;
    }

    isContextMenuCompleted(): boolean {
        // Mark context menu as complete if the last step is the current step
        return this.currentStep === this.steps.length - 1;
    }

    isCurrentStep(step: string): boolean {
        let index = this.steps.indexOf(step);
        return index === this.currentStep;
    }

    isLastStep(step: string): boolean {
        let index = this.steps.indexOf(step);
        return index === this.steps.length - 1;
    }

    renderCompletedIndicator(): JSX.Element {
        return (
            this.visibleSteps.map((step, index) =>
                <div class="step-container">
                    <div class="step-title"><span>{step}</span></div>
                    {this.isContextStep(index) && this.isCollapsed() ?
                        this.renderContextMenu()
                        : <div class="step-circle completed"  onClick={(event: UIEvent) => this.selectStep(event, step)}><span class="completed-icon"><i class="yo-check"></i></span></div>
                    }
                    {(index < this.visibleSteps.length - 1 ? <div class="progress-line"></div> : null)}
                </div>
            )
        );
    }

    renderContextMenu(): JSX.Element {
        return (
            (this.isCompleted || this.isContextMenuCompleted() ?
                <yoo-context-menu>
                    <div slot="trigger" class="step-circle completed"><span class="completed-icon"><i class="yo-more"></i></span></div>
                    <div class="context-container" attr-layout="column">
                        {this.collapsedSteps.map((step) =>  <span onClick={(event: UIEvent) => this.selectStep(event, step)}>{step}<i class="yo-check"></i></span>)}
                    </div>
                </yoo-context-menu>
                : <yoo-context-menu>
                    <div slot="trigger" class={'step-circle ' + (this.collapsedSteps.indexOf(this.steps[this.currentStep]) !== -1 ? 'current ' : ' ') + 'more'}>
                        <span><i class="yo-more"></i></span>
                    </div>

                    <div class="context-container" attr-layout="column">
                    {this.collapsedSteps.map((step) =>
                        <span class={this.isCurrentStep(step) ? 'context-current' : ''} onClick={(event: UIEvent) => this.selectStep(event, step)}>{step}
                            {this.isCompletedStep(step) ? <i class="yo-check"></i> : null}
                        </span>
                    )}
                    </div>
                </yoo-context-menu>
            )
        );
    }

    renderStepContainer(step: string, index: number, lastStep: string): JSX.Element {
        return (
            <div class="step-container">
                <div class="step-title"><span>{step}</span></div>
                {(this.isContextStep(index) && this.isCollapsed() ? this.renderContextMenu()
                    : (this.isCompletedStep(step) ? <div class="step-circle completed" onClick={(event: UIEvent) => this.selectStep(event, step)}><span class="completed-icon"><i class="yo-check"></i></span></div>
                        :  <div class={'step-circle ' + (this.isCurrentStep(step) ? 'current' : '' )} onClick={(event: UIEvent) => this.selectStep(event, step)}><span>{this.isLastStep(step) ? this.steps.length : index + 1}</span></div>)
                )}
                {(index < this.visibleSteps.length - 1 ? (this.isContextStep(index) ?
                    <div class={'progress-line ' + (this.isCurrentStep(lastStep) ? '' : 'faded')}></div>
                    : <div class={'progress-line ' + (!this.isCompletedStep(step) ? 'faded' : '')}></div>) : null)}
            </div>
        );
    }

    render(): JSX.Element {
        let lastStep = this.steps[this.steps.length - 1];
        // Collapse Items include all steps after the Context-Index (included) except for the last step
        this.collapsedSteps = this.steps.slice(this.contextStep, this.steps.length - 1);

        if (this.isCollapsed()) {
            this.visibleSteps = this.steps.slice(0, this.contextStep + 1);
            this.visibleSteps.push(lastStep);
        } else {
            this.visibleSteps = this.steps;
        }

        return (
            <div attr-layout="row" class="progress-indicator-container">
                {this.isCompleted ? this.renderCompletedIndicator() :
                    this.visibleSteps.map((step, index) => this.renderStepContainer(step, index, lastStep))
                }
            </div>
        );
    }
}
