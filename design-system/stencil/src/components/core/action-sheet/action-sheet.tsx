import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { IActionSheetButton } from '@shared/interfaces';
import { setAnimation } from '../../../utils/anim';

@Component({
    tag: 'yoo-action-sheet',
    styleUrl: 'action-sheet.scss',
    scoped: true
})
export class YooActionSheetComponent {

    @Prop() heading: string;
    @Prop() buttons: IActionSheetButton[] = [];

    @Event() actionSelected: EventEmitter<string>;
    @Event() actionSheetClosed: EventEmitter<boolean>; // catch and re send close modal event

     @Element() host: HTMLStencilElement;

    closeActionSheet(): void {
        setAnimation('slide_down', this.host.querySelector('div'), {open: false, up: false});
        this.actionSheetClosed.emit(true);
    }

    onButtonClick(heading: string, disabled: boolean): void {
        if (!disabled) {
            this.actionSelected.emit(heading);
            this.closeActionSheet();
        }
    }

    componentDidLoad() {
        setAnimation('slide_down', this.host.querySelector('div'), {open: true});
    }

    render(): JSX.Element {
        return (
            <yoo-modal has-header="false" class="action-sheet" onClosed={() => this.closeActionSheet()}>
                <div  attr-layout="column">
                <div class="outer-container">
                    <div class="top-container" attr-layout="column">
                        <div class="heading-container">
                            {this.heading}
                        </div>
                        {this.buttons.map((button) =>
                        <div class="inner-container" onClick={() => this.onButtonClick(button.text, button.disabled)}>
                                {button.text}
                                {button.icon ? (<i class={button.icon}></i>) : null}
                            </div>
                        )}
                    </div>
                    <div class="bottom-container">
                        <div class="cancel-container" onClick={() => this.closeActionSheet()}>
                            Cancel
                        </div>
                    </div>
                </div>
                </div>
            </yoo-modal>
        );
    }
}