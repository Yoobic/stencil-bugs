import { Component, Prop, Element, State } from '@stencil/core';

@Component({
    tag: 'yoo-fab-button',
    styleUrl: 'fab-button.scss',
    scoped: true
})
export class YooFabButtonComponent {

    @Prop() fabEntry: FabButtonEntry = {};
    @Prop() text: string;
    @Prop() icon: string;
    @Prop() disabled: boolean = false;
    @Prop() toggleActive: Function;
    @Prop() parentHasList: boolean = false;
    @Prop() activated: boolean = false;
    @Prop() label: string;

    // Toggle buttons in a list
    @State() inContainer: boolean = false;
    @State() inList: boolean = false;
    @State() activatedState: boolean = false;

     @Element() host: HTMLStencilElement;

    componentDidLoad() {
        const parentNode = this.host.parentElement;
        const parentTag = parentNode ? parentNode.nodeName : null;

        this.inContainer = (parentTag === 'YOO-FAB-CONTAINER');
        this.inList = (parentTag === 'YOO-FAB-LIST');
    }

    getButtonClasses(): CssClassMap {
        return {
            'fab-button': true,
            'fab-in-list': this.inList
        };
    }

    onClick(): void {
        if (this.inContainer && this.parentHasList) {
            this.toggleActive();
            this.activatedState = !this.activatedState;
        } else {
            if (this.fabEntry.handler && !this.disabled) {
                this.fabEntry.handler();
            }
        }
    }

    isActivated(): boolean {
        return (this.activatedState && this.inContainer);
    }

    renderListButton(): JSX.Element {
        return (
            <div class="list-button-container">
                {this.label ? <yoo-badge text={this.label}></yoo-badge> : ''}
                <yoo-button class="fab icon-only" disabled={this.disabled} icon={this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : '')} text={this.fabEntry.text ? this.fabEntry.text : (this.text ? this.text : '')}></yoo-button>
            </div>
        );
    }

    renderContainerButton(): JSX.Element {
        return (
            <yoo-button class="fab icon-only" disabled={this.disabled} icon={(this.isActivated() ? 'yo-close2' : (this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : '')))} text={(this.isActivated() ? '' : this.fabEntry.text ? this.fabEntry.text : this.text ? this.text : '' )}></yoo-button>
        );
    }
    render(): JSX.Element {
        const fabClasses = {
            ... this.getButtonClasses()
        };

        return (
            <div class={fabClasses} onClick={this.onClick.bind(this)}>
                {this.inList ? this.renderListButton() : this.renderContainerButton()}
            </div>
        );
    }
}
export interface FabButtonEntry {
    icon?: string;
    text?: string;
    handler?: Function;
}

export interface CssClassMap { [className: string]: boolean; }
