import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { services } from '../../../services';

@Component({
    tag: 'yoo-result-dialog',
    styleUrl: 'result-dialog.scss',
    scoped: true
})
export class YooResultDialogComponent {

    @Prop() heading: string;
    @Prop() subheading: string;
    @Prop() success: boolean;
    @Prop() buttonText: string;

    @Event() close: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    onClose() {
        this.close.emit();
    }

    render(): JSX.Element {
        return (
            <div class="outer-container">
                <img class="result-dialog-icon" src={this.success ? 'assets/empty-states/check.svg' : 'assets/empty-states/reject.svg'} />
                {(this.heading ?
                    <div class="result-dialog-heading" innerHTML={services.translate.polyglot(this.heading)}></div> : null)}
                {(this.subheading ? <div class="result-dialog-subheading" innerHTML={services.translate.polyglot(this.subheading)}></div> : null)}
                <div class="result-dialog-footer">
                    <div class="border"></div>
                    <div class="result-dialog-footer-button" onClick={() => this.onClose()}>
                        {services.translate.get(this.buttonText || 'OK')}
                    </div>
                </div>
            </div>
        );
    }
}
