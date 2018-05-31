import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { getElementDimensions } from '../../../utils/helpers';
@Component({
    tag: 'yoo-breadcrumbs',
    styleUrl: 'breadcrumbs.scss',
    scoped: true,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        role: 'navigation'
    }
})
export class YooBreadcrumbsComponent {

    ITEM_WIDTH = 80;
    MAX_VISIBLE_ITEMS: number = 7;

    @Prop() items: string[] = [];

    @Event() itemSelected: EventEmitter<string>;

    @State() visibleItems = 7;

    @Element() host: HTMLStencilElement;

    componentWillLoad() {
        this.setItemNumber();
        // check the body width here and set max_steps accordingly
        window.addEventListener('resize', () => this.setItemNumber());
    }

    setItemNumber(): void {
        let width = getElementDimensions(this.host.parentElement).width;

        this.visibleItems = Math.min(Math.floor(width / this.ITEM_WIDTH), this.MAX_VISIBLE_ITEMS);
    }
    selectItem(item: string): void {
        this.itemSelected.emit(item);
    }

    isLastItem(index: number, arr: string[]): boolean {
        return index === arr.length - 1;
    }

    renderDefaultBreadcrumbItem(item: string, index: number, arr: string[]): JSX.Element {
        // last item is active
        return (
            <div class={'breadcrumb-item ' + (this.isLastItem(index, arr) ? 'active' : '')} onClick={this.selectItem.bind(this, item)}>
                <span>{item}</span>
                {(!this.isLastItem(index, arr) ? <i class="yo-right"></i> : '')}
            </div>
        );
    }

    renderCollapsedBreadcrumbItem(item: string): JSX.Element {
        return (<span onClick={this.selectItem.bind(this, item)}>{item}</span>);
    }

    // totalItems > MAX_VISIBLE_ITEMS creates a dropdown
    render(): JSX.Element {

        let collapsedItems = [];
        if (this.items.length > this.MAX_VISIBLE_ITEMS) {
            collapsedItems = this.items.slice(0, this.items.length - this.visibleItems);
        }
        let visibleItems;
        collapsedItems.length > 0 ? visibleItems = this.items.slice(this.items.length - this.visibleItems) : visibleItems = this.items;

        return (
            <div class={'breadcrumb ' + (collapsedItems.length > 0 ? 'long' : '')} attr-layout="row">
            {collapsedItems.length > 0 ?
                <yoo-context-menu>
                    <div slot="trigger" class="breadcrumb-item more">
                        <span class="more-icons">
                            <i class="yo-more"></i> <i class="yo-arrow-dropdown"></i>
                        </span>
                        <span class="yo-right"></span>
                    </div>
                    <div class="context-container" attr-layout="column">
                        {collapsedItems.map(item => this.renderCollapsedBreadcrumbItem(item))}
                    </div>
                </yoo-context-menu>
            : ''}
            {visibleItems.map((item, index, arr) => this.renderDefaultBreadcrumbItem(item, index, arr))}
            </div>
        );
    }
}
