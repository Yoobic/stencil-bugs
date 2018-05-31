import { Component, Prop, State, Method, Element, Event, EventEmitter } from '@stencil/core';
import { IContextMenuEntry } from '@shared/interfaces';

@Component({
    tag: 'yoo-context-menu',
    styleUrl: 'context-menu.scss',
    scoped: true
})
export class YooContextMenuComponent {

    @Prop() items: Array<IContextMenuEntry>;
    @Prop() context: any;

    @Event() contextMenuOpened: EventEmitter<boolean>;
    @Event() contextMenuClosed: EventEmitter<boolean>;

    @State() opened: boolean = false;

     @Element() host: HTMLStencilElement;

    @Method()
    open(): void {
        this.opened = true;
    }

    @Method()
    close(): void {
        this.opened = false;
    }

    componentWillLoad() {
        this.setupListener();
    }

    componentDidLoad() {
        this.calculateDropdownOpenDirection();
    }

    setupListener() {
        window.addEventListener('click', () => this.toggleWindow());
        window.addEventListener('touchstart', () => this.toggleWindow());
        window.addEventListener('resize', () => this.calculateDropdownOpenDirection());
    }

    calculateDropdownOpenDirection(): void {
        let rect = this.host.getBoundingClientRect();
        let position = window.innerHeight - rect.bottom;
        let dropdownContent = this.host.querySelector('.dropdown-content');
        let totalDropdownHeight = (rect.bottom - rect.top) + dropdownContent.clientHeight;
        dropdownContent.setAttribute('style', `transform: translateY(${dropdownContent.clientHeight > position ? '-' + totalDropdownHeight + 'px' : '0%'});`);
    }

    toggle(): void {
        if (!this.opened) {
            this.contextMenuOpened.emit(true);
            setTimeout(() => {
                this.open();
            }, 50);
        }
    }

    toggleWindow() {
        if (this.opened) {
            this.close();
            this.contextMenuClosed.emit(true);
        }
    }

    onItemClick(item: IContextMenuEntry, index: number): void {
        if (item && item.handler) {
            let context = this.context && this.context.toJS && item.sendImmutable !== true ? this.context.toJS() : this.context;
            item.handler(context, index);
        }
    }

    render(): JSX.Element {
        return [
            <span aria-haspopup="true" aria-expanded="false" onClick={() => this.toggle()}>
                <slot name="trigger"></slot>
            </span>,
            <div class={`${this.opened ? 'show' : ''} dropdown-content`}>
                {
                    this.items && this.items.length > 0 ?
                        this.items.map((item, i) =>
                            <div class={`${item.separator ? 'border-bottom' : ''} ${item.separatorAfter ? 'border-top' : ''} dropdown-entry`} onClick={() => this.onItemClick(item, i)}>{item.itemTitle}</div>)
                        : ''
                }
                <slot></slot>
            </div>
        ];
    }
}
