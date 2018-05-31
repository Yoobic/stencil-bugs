import { Component, Element, Prop } from '@stencil/core';
import { ITranslateService } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-recap-step',
    styleUrl: 'form-recap-step.scss',
    scoped: true
})
export class YooFormRecapStepComponent {

    @Prop() stepNumber: number;
    @Prop() mainTitle: string;
    @Prop() subTitle: string;
    @Prop() validity: boolean;

     @Element() host: HTMLStencilElement;

    private translate: ITranslateService = (window as any).translateService;

    render(): JSX.Element {
        return (
            <div class={'container ' + (this.validity === true ? 'valid' : (this.validity === false ? 'invalid' : ''))}>
                <div class="step">{this.translate.get('STEP') + ' ' + this.stepNumber}</div>
                <div class="title">{this.translate.get(this.mainTitle)}</div>
                <div class="subtitle">{this.translate.get(this.subTitle)}</div>
            </div>
        );
    }
}
