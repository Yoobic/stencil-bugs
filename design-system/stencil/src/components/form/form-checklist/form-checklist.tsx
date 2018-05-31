import { Component, Prop, State, Element } from '@stencil/core';

@Component({
    tag: 'yoo-form-checklist',
    styleUrl: 'form-checklist.scss',
    scoped: true
})
export class YooFormChecklistComponent {

    @Prop() previousTasks: Array<string> = [];

    @State() tasks: Array<string> = [];

     @Element() host: HTMLStencilElement;

    onInputBlurred(ev: CustomEvent) {
        let task = ev.detail && ev.detail.target && ev.detail.target.value;
        this.tasks = [...this.tasks, task];
        const inputEl = this.host.shadowRoot.querySelector('input');
        inputEl.value = null;
    }

    render(): JSX.Element {
        return (
            <div class="container">
                <div class="tasks">
                    {this.previousTasks.map((task) =>
                        <div class="task">{task}</div>
                    )}
                </div>

                <div class="input">
                    <yoo-form-input onInputBlurred={(event) => this.onInputBlurred(event)}></yoo-form-input>
                </div>

                <div class="tasks">
                    {this.tasks.map((task) =>
                        <div class="task">{task}</div>
                    )}
                </div>
            </div>
        );
    }
}
