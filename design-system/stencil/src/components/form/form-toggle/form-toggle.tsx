import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { setAnimation, animations } from '../../../utils/anim';
import { setValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { IFormToggle, FormDisplayType, Validator, AsyncValidator, ValidatorEntry } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-toggle',
    styleUrl: 'form-toggle.scss',
    scoped: true
})
export class YooFormToggleComponent implements IFormToggle {

    @Prop({ mutable: true }) value: boolean;
    @Prop() validators: Array<Validator<boolean> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<boolean>>;
    @Prop() readonly: boolean;
    @Prop() type: FormDisplayType = 'normal';

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() host: HTMLStencilElement;

    componentWillLoad() {
        setValidator(this);
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }

    onToggle(): void {
        if (!this.readonly) {
            setAnimation(animations.slideHorizontal, this.host.querySelector('.inner-container'), { open: (this.value ? false : true), distance: 14, start: -1 });
            this.value = !this.value;
            setValueAndValidateInput(this.value, this);
        }
    }

    renderReadonly(): JSX.Element {
        return (
            <div class="readonly" attr-layout="row">
                {this.value === true ? <i class="yo-check-solid success"></i> : (this.value === false ? <i class="yo-cross-danger danger"></i> : <i class="yo-circle"></i>)}
            </div>
        );
    }

    renderEditable(): JSX.Element {
        return (
            <div class="outer-container" attr-layout="row">
                <div class={'toggle-container' + (this.value ? ' active' : '')} attr-layout="row" onClick={() => this.onToggle()}>
                    <div class={'inner-container' + (this.value ? ' active' : '')}></div>
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }

}