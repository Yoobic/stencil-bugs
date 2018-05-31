import { Component, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import { IRadioGroupEntry } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-radio-group',
    styleUrl: 'form-radio-group.scss',
    scoped: true
})
export class YooFormRadioGroupComponent {

    @Prop() values: IRadioGroupEntry[] = [];
    @Prop() multipleSelection: boolean = false;

    @Event() selectionChanged: EventEmitter<Array<IRadioGroupEntry>>;

    @State() items: IRadioGroupEntry[] = [];

     @Element() host: HTMLStencilElement;

    private radioReset(): void {
        this.items = this.items.map((item, index) => {
            return {text: item.text, checked: false};
        });
    }

    private calculateRadioSelection(index: number) {
        if (this.multipleSelection) {
            this.items[index].checked = !this.items[index].checked;
        } else {
            let alreadyChecked = this.items[index].checked;
            this.radioReset();
            this.items[index].checked = !alreadyChecked;
        }
    }

    onRadioClicked(index: number) {
        this.calculateRadioSelection(index);
        this.selectionChanged.emit(this.items);
    }

    componentWillLoad() {
        this.items = this.values;
    }

    render(): JSX.Element {
        return (
            <div class="container" attr-layout="column">
                {this.items.map((obj, index) =>
                    <div class="inner-container">
                        <yoo-form-radio text={obj.text} class={this.host.className} state={obj.checked ? 'checked' : 'unchecked'} onRadioClicked={() => this.onRadioClicked(index)}></yoo-form-radio>
                    </div>
                )}
            </div>
        );
    }
}

