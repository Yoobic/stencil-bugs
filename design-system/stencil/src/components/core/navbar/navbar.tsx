import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { INavBarTab, ITranslateService } from '@shared/interfaces';
import { getElementDimensions } from '../../../utils/helpers';

@Component({
    tag: 'yoo-navbar',
    styleUrl: 'navbar.scss',
    scoped: true
})
export class YooNavbarComponent {

    @Prop() tabs: Array<INavBarTab> = [];
    @Prop({ mutable: true }) selectedTab: INavBarTab;
    @Prop() withLine: boolean = false;
    @Prop() actionBtnText: string;
    @Prop() animationOnLoadTime: number = 50;

    @Event() tabSelected: EventEmitter<INavBarTab>;
    @Event() tabSelectedIsToRight: EventEmitter<boolean>;
    @Event() actionButtonClicked: EventEmitter<boolean>;

    @State() numberOfVisibileItemsState: number;
    @State() showDropdown: boolean = false;
    // @State() selectedTab: INavBarTab;

     @Element() host: HTMLStencilElement;

    totalElementWidthArray = [];

    private translate: ITranslateService = (window as any).translateService;
    private elementWidthArray = [];
    private activeTitleInDropDown: boolean;
    private selectedTabIndex: number;

    get cumulativeHeadingsWidth(): number[] {
        let elementWidth: number = 0;
        let elementArray = [];
        this.tabs.map((tab, i) => [
            elementWidth = elementWidth + this.host.querySelector('.tab' + i).scrollWidth,
            elementArray.push(elementWidth)
        ]);
        return elementArray;
    }

    get individualHeadingsWidth(): number[] {
        let elementWidth: number = 0;
        let elementArray = [];
        this.tabs.map((tab, i) => [
            elementWidth = this.host.querySelector('.tab' + i).scrollWidth,
            elementArray.push(elementWidth)
        ]);
        return elementArray;
    }

    get dropDownWidth(): number {
        if (this.activeTitleInDropDown) {
            return this.elementWidthArray[this.selectedTabIndex] + 20;
        } else {
            return 40; //pixel width of dropdown
        }
    }

    get numberOfVisibileItems(): number {
        let width = getElementDimensions(this.host).width;
        let visibileItems = this.tabs.length;
        let firstValue = false;
        this.tabs.map((_title, index) => {
            if ((width - this.dropDownWidth) < this.totalElementWidthArray[index] && !firstValue) {
                if (index === 0 ) {
                    visibileItems = 1;
                } else {
                    visibileItems = index;
                }
                firstValue = true;
            }
        });
        return visibileItems;
    }

    onSelectTab(tab: INavBarTab, index: number): void {
        let isToRight: boolean = (index > this.selectedTabIndex);
        this.selectedTab = tab;
        this.selectedTabIndex = index;
        this.tabSelectedIsToRight.emit(isToRight);
        setTimeout( () => {
            this.tabSelected.emit(tab);
        }, 50);
        this.resizePage();
    }

    componentWillLoad() {
        if (!this.selectedTab) {
            this.selectedTab = this.tabs[0];
            this.selectedTabIndex = 0;
        }
        this.numberOfVisibileItemsState = this.tabs.length;
    }

    componentDidLoad(): void {
        this.totalElementWidthArray = this.cumulativeHeadingsWidth;
        this.elementWidthArray = this.individualHeadingsWidth;
        this.resizePage();
        setTimeout(() => {
            this.resizePage();
        }, this.animationOnLoadTime);
        window.addEventListener('resize', () => this.resizePage());
    }

    resizePage(): void {
        this.numberOfVisibileItemsState = this.numberOfVisibileItems;
        this.showDropdown = (this.numberOfVisibileItemsState < this.tabs.length);
    }

    activeDropdownTitle(): void {
        this.activeTitleInDropDown = true;
        this.tabs.slice(0, this.numberOfVisibileItemsState).map((tab) =>
            this.selectedTab === tab ? this.activeTitleInDropDown = false : null
        );
    }

    actionBtnClicked() {
        this.actionButtonClicked.emit(true);
    }

    render(): JSX.Element {
        return ([
            <div class="outer-container" attr-layout="row">
                {this.tabs.slice(0, this.numberOfVisibileItemsState).map((tab, i, arr) =>
                    <div class={'inner-container' + (this.selectedTab === tab ? ' active' : '') + ' tab' + i + (i === arr.length - 1 ? ' last' : '')} onClick={() => this.onSelectTab(tab, i)} attr-layout="row">
                        {tab.hasNotification ? <div class="notification"></div> : null}
                        {tab.title}
                    </div>
                )}
                {this.showDropdown ? [
                    <yoo-context-menu>
                        {this.activeDropdownTitle()}
                        <div class={'inner-container' + (this.activeTitleInDropDown ? ' active' : '')} slot="trigger" attr-layout="row" id="dropdown">
                            {this.activeTitleInDropDown ? this.selectedTab.title : (this.translate ? this.translate.get('PREVIOUS') : 'Previous' )} <span class="icon"><i class="yo-arrow-dropdown"></i></span>
                        </div>
                        {this.tabs.slice(this.numberOfVisibileItemsState, this.tabs.length).map((tab, i) =>
                            <div class={'dropdown' + (this.selectedTab === tab ? ' active' : '') + ' tab' + i} onClick={() => this.onSelectTab(tab, i)}>{tab.title}</div>
                        )}
                    </yoo-context-menu>
                ]
                    : null}
                {this.actionBtnText ? <yoo-button class={'medium ' + this.host.className} text={this.actionBtnText} onButtonClicked={() => this.actionBtnClicked()}></yoo-button> : ''}
            </div>,
            this.withLine ? <div attr-layout="row" class="nav-line"></div> : ''
        ]);
    }
}
