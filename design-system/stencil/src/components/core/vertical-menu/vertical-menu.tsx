import { Component, Prop, State, Event, EventEmitter, Element, Method } from '@stencil/core';
import { IVerticalMenuEntry, IVerticalMenuRow, IVerticalMenuItem } from '@shared/interfaces';
import { YooSlimScrollComponent } from '../slim-scroll/slim-scroll';

@Component({
    tag: 'yoo-vertical-menu',
    styleUrl: 'vertical-menu.scss',
    scoped: true
})
export class YooVerticalMenuComponent {

    @Prop({ mutable: true }) entry: IVerticalMenuEntry = { menuRows: [] };
    @Prop() fixed: boolean = true;
    @Prop() heading: string;
    @Prop() imgSrc: string;

    @Event() itemClicked: EventEmitter<IVerticalMenuItem>;
    @Event() menuClosed: EventEmitter<boolean>; // catch and re send close modal event

    @State() activeRow: boolean[] = [];

     @Element() host: HTMLStencilElement;

    onModalClosed() {
        this.menuClosed.emit(true);
    }

    componentWillLoad() {
        this.activeRow = this.entry.menuRows.map(() => false);
        if (this.fixed) {
            this.host.classList.add('fixed');
        }
    }

    componentDidLoad() {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            slim.height = this.getInnerHeight();
            setTimeout(() => slim.refresh(), 200);
        }
    }

    componentDidUpdate() {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            //slim.height = this.getInnerHeight();
            setTimeout(() => slim.refresh(), 200);
        }
    }

    getInnerHeight(): string {
        let header: HTMLElement = this.host.querySelector('.menu-header');
        if (header) {
            return (window.innerHeight - header.clientHeight) + 'px';
        }
        return '';
    }

    onItemClick(item: IVerticalMenuItem, index: number = null): void {
        this.itemClicked.emit(item);
        if (index || index === 0) {
            this.activeRow[index] = !this.activeRow[index];
            this.activeRow = this.activeRow.map((e) => e);
        }
        if (item) {
            this.setItemActive(item);
        }
    }

    @Method()
    setItemActive(menuItem: IVerticalMenuItem) {
        this.entry = {
            menuRows: this.entry.menuRows.map((row) => {
                row.item.isActive = row.item === menuItem && !row.item.isActive;
                if (row.subItems) {
                    row.subItems = row.subItems.map((item) => {
                        item.isActive = menuItem === item;
                        row.item.isActive = row.item.isActive || menuItem === item;
                        return item;
                    });
                }
                return row;
            })
        };
    }

    renderItem(item: IVerticalMenuItem, hasSubItem: boolean, index: number = null): JSX.Element {
        return (

            <a href={item.anchor ? item.anchor : null}>
                <div class={'item' + ((item.isActive) ? ' active' : '')}
                    onClick={() => this.onItemClick(item, index)}
                    attr-layout="row">
                    {item.imgSrc ? <img src={item.imgSrc} /> : null}
                    {item.icon ? <i class={item.icon} /> : null}
                    {item.text ?
                        <span>{item.text}</span>
                        : null}
                    {hasSubItem ?
                        <i class={'yo-arrow-dropdown' + ((this.activeRow[index]) ? ' chevron-active' : '')} />
                        : null}
                </div>
            </a>
        );
    }

    renderRow(row: IVerticalMenuRow, index): JSX.Element {
        if (row.subItems && row.subItems !== []) {
            return (
                <div class={'row' + ((this.activeRow[index]) ? ' sub-display' : ' hidden')}>
                    {this.renderItem(row.item, true, index)}
                    <div class="sub-container">
                        <div class={'row-subitems'}>
                            {row.subItems.map((subItem) =>
                                this.renderItem(subItem, false)
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="row">
                    {this.renderItem(row.item, false)}
                </div>
            );
        }
    }

    render(): JSX.Element {
        return (
            this.fixed ?
                <div class="fixed-container" attr-layout="column">
                    <div class="menu-header">
                        <span>{this.heading}</span>
                        <div class="header-slot">
                            <img class="image" src={this.imgSrc} alt="Menu Header" />
                        </div>
                    </div>
                    <yoo-slim-scroll>
                        <div>
                            {this.entry.menuRows.map((row, index) =>
                                this.renderRow(row, index)
                            )}
                        </div>
                    </yoo-slim-scroll>
                </div>
                :
                <yoo-modal heading={this.heading ? this.heading : ''} class="menu dark" onClosed={() => this.onModalClosed()}>
                    <div attr-layout="column">
                        {this.entry.menuRows.map((row, index) =>
                            this.renderRow(row, index)
                        )}
                    </div>
                </yoo-modal>
        );
    }
}
