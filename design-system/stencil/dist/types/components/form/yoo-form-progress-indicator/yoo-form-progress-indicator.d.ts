import { EventEmitter } from '@stencil/core';
export declare class YooFormProgressIndicatorComponent {
    MAX_STEPS: number;
    STEP_SIZE: number;
    steps: string[];
    currentStep: number;
    isCompleted: boolean;
    stepSelected: EventEmitter<string>;
    shownSteps: number;
    contextStep: number;
    host: HTMLElement;
    private collapsedSteps;
    private visibleSteps;
    selectStep(event: UIEvent, step: string): void;
    componentWillLoad(): void;
    setStepNumber(): void;
    isCollapsed(): boolean;
    isCompletedStep(step: string): boolean;
    isContextStep(index: number): boolean;
    isContextMenuCompleted(): boolean;
    isCurrentStep(step: string): boolean;
    isLastStep(step: string): boolean;
    renderCompletedIndicator(): JSX.Element;
    renderContextMenu(): JSX.Element;
    renderStepContainer(step: string, index: number, lastStep: string): JSX.Element;
    render(): JSX.Element;
}
