import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

export const DEFAULT_COLOR = '#ffffff';

@Component({
    tag: 'yoo-form-color-picker',
    styleUrl: 'form-color-picker.scss',
    scoped: true
})
export class YooFormColorPickerComponent {

    @Prop() color: string = DEFAULT_COLOR;
    @Prop() hideLabel: boolean = false;

    @Event() colorSelected: EventEmitter<string>;

    @State() currentColor: string;

    @Element() host: HTMLStencilElement;

    colorValidation(newValue: string): void {
        let validation = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'); // Regular Expression to validate hexadecimal color
        if (validation.test(newValue) && newValue.length === 7) {
            this.currentColor = newValue;
        } else {
            this.currentColor = DEFAULT_COLOR;
        }
    }

    onInputChange(ev: Event) {
        this.currentColor = (ev.target as any).value; //Use to re-render !! needed to reset input value
        this.colorValidation((ev.target as any).value);
        this.colorSelected.emit(this.currentColor);
    }

    componentWillLoad() {
        this.colorValidation(this.color);
    }

    render(): JSX.Element {
        let colorSelectorStyle = { background: this.currentColor };
        return (
            <div class="color-picker-container" attr-layout="row">
                <div class="color-selector" style={colorSelectorStyle}>
                    <input type="color" value={this.currentColor} onChange={(event) => this.onInputChange(event)} onInput={(event) => this.onInputChange(event)} />
                </div>
                {this.hideLabel ? null :
                    <input type="text" value={this.currentColor} onChange={(event) => this.onInputChange(event)} />
                }
            </div>
        );
    }
}
