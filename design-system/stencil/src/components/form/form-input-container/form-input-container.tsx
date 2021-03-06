import { Component, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import { debounce, isBlank } from '../../../utils/helpers/helpers';

@Component({
    tag: 'yoo-form-input-container',
    styleUrl: 'form-input-container.scss',
    scoped: true
})
export class YooFormInputContainerComponent {

    @Prop() field: any;
    @Prop() readonly: boolean;
    @Prop() comments: string;

    @Event() commented: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    @State() showComments: boolean = false;

    componentDidLoad() {
        let toggleLine = this.host.querySelector('yoo-form-toggle.line');
        let checkboxLine = this.host.querySelector('yoo-form-checkbox.line');
        if (toggleLine || checkboxLine) {
            this.host.classList.add('line');
        }
        this.showComments = this.readonly && !isBlank(this.comments);
    }

    onToggleComments() {
        this.showComments = !this.showComments;
        if (this.showComments) {
            setTimeout(() => {
                this.onFocusComments();
            }, 200);
        }
    }

    onFocusComments() {
        // let comment = this.host.querySelector('yoo-form-text-area');
        // if (comment) {
        //     comment.setFocus();
        // }
    }

    // tslint:disable-next-line:member-ordering
    onCommentsChange = debounce((ev: CustomEvent) => {
        this.commented.emit(ev.detail);
    });

    render(): JSX.Element {
        return this.field ? [
            this.field.description ? <div class="description" innerHTML={(this.field.description)}> </div> : '',
            !this.field.description ?
                <div class="label">
                    <span innerHTML={(this.field.required ? '* ' : '') + (this.field.title || this.field.name.toUpperCase())}></span>
                </div> : null,
            <div class="content-container">
                <slot />
            </div>,
            this.field.hint ? <div class="hint" innerHTML={this.field.hint}></div> : '',
            (this.field.allowComments || this.field.allowTask) && !this.readonly ?
                <div class="footer">
                    {this.field.allowComments ? <i class="yo-comment" onClick={() => this.onToggleComments()}></i> : null}
                </div> : null
        ] : null;
    }
}
