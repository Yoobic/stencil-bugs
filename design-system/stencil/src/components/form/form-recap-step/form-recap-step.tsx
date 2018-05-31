import { Component, Element, Prop } from '@stencil/core';
import { services } from '../../../services';

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

    render(): JSX.Element {
        return (
            <div class={'container ' + (this.validity === true ? 'valid' : (this.validity === false ? 'invalid' : ''))}>
                <div class="step">{services.translate.get('STEP') + ' ' + this.stepNumber}</div>
                <div class="title">{services.translate.get(this.mainTitle)}</div>
                <div class="subtitle">{services.translate.get(this.subTitle)}</div>
            </div>
        );
    }
}
