import { Component, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';

@Component({
    tag: 'yoo-tabs',
    styleUrl: 'tabs.scss',
    scoped: true
})
export class YooTabsComponent {

    @Prop() titles: string[] = [];
    @Prop() selected: number = 0;
    @Prop() numberTabsDisplayed: number = 4;

    @Event() tabChanged: EventEmitter<string>;

    @State() tabsDisplayed: number;
    @State() selectedTab: string;

     @Element() host: HTMLStencilElement;

    @Watch('selected')
    selectedChange(newValue: number): void {
        if (newValue < this.titles.length && newValue >= 0) {
            this.selectedTab = this.titles[newValue];
        }
    }

    @Watch('titles')
    titlesChange(newValue: string[]) {
        if (this.selected < this.titles.length ) {
            this.selectedTab = this.titles[this.selected];
        }
    }

    private handleClickTab(title: string): void {
        this.selectedTab = title;
        this.tabChanged.emit(title);
    }

    componentWillLoad() {
        if (this.selected < this.titles.length) {
            this.selectedTab = this.titles[this.selected];
        }
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
        window.addEventListener('resize', () => this.onResize());
    }

    onResize(): void {
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
    }

    @Watch('numberTabsDisplayed')
    setMaximumTabDisplayable(newValue: number): void {
        const maxWidthTitle = 100;
        const maxHeightTitle = 70;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let displayableTabs: number;

        if (this.host.classList.contains('vertical')) {
            displayableTabs =  Math.floor((height / maxHeightTitle)) - 1;
        } else {
            displayableTabs =  Math.floor((width / maxWidthTitle)) - 1;
        }
        if (newValue < displayableTabs) {
            this.tabsDisplayed = newValue;
        } else {
            this.tabsDisplayed = displayableTabs;
        }
    }

    render(): JSX.Element {
        return (
            <div class="outer-container">
                <div class="tab-selector">
                    {this.titles.slice(0, this.tabsDisplayed).map((title) =>
                            <div class={'tab-title' + ((this.selectedTab === title) ? ' active-title' : '')}
                                onClick={() => this.handleClickTab(title)}>
                                {title}
                            </div>
                    )}
                    {this.tabsDisplayed < this.titles.length ?
                    <div class="tab-title">
                        <yoo-context-menu>
                            <div slot="trigger" class="tab-title-other">
                                Other <span class={this.host.className.indexOf('vertical') !== -1 ? 'yo-right' : 'yo-arrow-dropdown'}></span>
                            </div>
                            {this.titles.slice(this.tabsDisplayed).map((title, index) =>
                                    <div class={'other-title dropdown-entry' + ((index) ? ' border-bottom' : '')} onClick={() => this.handleClickTab(title)} data-yoo-context-menu>{title}</div>
                            )}
                        </yoo-context-menu>
                    </div>
                    : null
                    }
                </div>
                <div class="tab-content">
                    {this.titles.map((title) =>
                        <div class={this.selectedTab === title ? 'selected-tab' : 'undisplayed-tab'}>
                            <slot name={title}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
