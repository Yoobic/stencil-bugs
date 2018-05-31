import { Component, Prop, State, Element } from '@stencil/core';
import { IActionBar } from '@shared/interfaces';

@Component({
    tag: 'yoo-toolbar',
    styleUrl: 'toolbar.scss',
    scoped: true
})
export class YooToolbarComponent {

    @Prop() actions: IActionBar[];
    @Prop() showActive: boolean = false;

    @State() activeAction: IActionBar;

    @Element() host: HTMLStencilElement;

    public colors: Array<string> = ['accent', 'danger', 'success', 'info', 'warning', 'dark-60'];

    onClick(action: IActionBar) {
        if (action && action.handler) {
            action.handler();
            if (this.showActive) {
                this.activeAction = action;
            }
        }
    }

    getColor(i: number): string {
        return this.colors[i % this.colors.length];
    }

    render() {
        return this.actions ? (
            <div class="container" attr-layout="row" attr-layout-align="space-around center">
                <div class="actions" attr-layout="row" attr-layout-align="space-between">
                    {this.actions.map((a, i) =>
                        <div onClick={this.onClick.bind(this, a)} class={'action ' + (this.activeAction === a ? 'active' : '')}>
                            <div class="circle-container">
                                <div class={'circle-border border-' + this.getColor(i)} ></div>
                                <div class={'circle ' + this.getColor(i)}><i class={a.icon}></i></div>
                            </div>
                            <div class="label">{a.title}</div>
                        </div>
                    )}
                </div>
            </div>
        ) :
            (<div class="container" attr-layout="row" attr-layout-align="space-around center">
                <slot />
            </div>);
    }
}
