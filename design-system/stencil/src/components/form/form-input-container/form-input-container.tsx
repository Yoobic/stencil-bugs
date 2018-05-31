import { Component, Prop, Element } from '@stencil/core';
import { IFormInputContainer } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-input-container',
    styleUrl: 'form-input-container.scss',
    scoped: true
})
export class YooFormInputContainerComponent implements IFormInputContainer {

    @Prop() label: string;
    @Prop() description: string;
    @Prop() hint: string;
    @Prop() required: boolean;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return [
            this.description ? <div class="description" innerHTML={this.description}> </div> : '',
            this.label ?
                <div class="label">
                    <span innerHTML={this.label}></span>
                    {this.required ? <span class="label-required">*</span> : null}
                </div> : null,
            <div class="content-container">
                <slot />
            </div>,
            this.hint ? <div class="hint">{this.hint}</div> : ''
        ];
    }
}
