export class YooNavbarComponent {
    constructor() {
        this.titles = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5'];
        this.numberOfVisibleTitles = this.titles.length;
        this.showDropdown = false;
        this.elementWidth = 0;
        this.elementWidthArray = [];
        this.totalElementWidthArray = [];
        this.elementDropdownWidthArray = [];
        this.totalWidth = 0;
        this.dropdownWidth = 60;
    }
    titleSelected(title) {
        this.selectedTitle = title;
        this.titleClicked.emit(title);
    }
    componentDidLoad() {
        this.calculateTotalElementWidth();
        this.resizePage();
        window.addEventListener('resize', () => this.resizePage());
    }
    calculateTotalElementWidth() {
        const INDIVIDUAL_PADDING = 5;
        this.totalWidth = 0;
        this.titles.map((title) => [
            this.elementWidth = this.host.querySelector('#' + title.replace(/\s/g, '')).scrollWidth + INDIVIDUAL_PADDING,
            this.totalWidth = this.totalWidth + this.elementWidth,
            this.totalElementWidthArray.push(this.totalWidth),
            this.elementWidthArray.push(this.elementWidth)
        ]);
        this.calculateElementsWithDropDownWidth();
    }
    calculateElementsWithDropDownWidth() {
        this.elementDropdownWidthArray = [];
        let titleArray = Array.from(Array(this.titles.length).keys());
        titleArray.map((i) => {
            if (i < this.titles.length - 2) {
                this.elementDropdownWidthArray.push(this.totalElementWidthArray[i] + this.dropdownWidth);
            }
            else {
                this.elementDropdownWidthArray.push(this.totalElementWidthArray[i]);
            }
        });
    }
    resizePage() {
        this.calculateDropdownWidth();
        const PAGE_WIDTH = window.innerWidth;
        if (PAGE_WIDTH < this.elementDropdownWidthArray[this.numberOfVisibleTitles - 1]) {
            if (this.numberOfVisibleTitles === this.titles.length) {
                this.numberOfVisibleTitles = this.numberOfVisibleTitles - 2;
                this.showDropdown = true;
            }
            else {
                this.numberOfVisibleTitles = this.numberOfVisibleTitles - 1;
            }
        }
        if (PAGE_WIDTH > this.elementDropdownWidthArray[this.numberOfVisibleTitles]) {
            if (this.numberOfVisibleTitles === this.titles.length - 2) {
                if (PAGE_WIDTH > this.elementDropdownWidthArray[this.numberOfVisibleTitles + 1]) {
                    this.numberOfVisibleTitles = this.numberOfVisibleTitles + 1;
                }
            }
            else {
                this.numberOfVisibleTitles = this.numberOfVisibleTitles + 1;
            }
            if (this.numberOfVisibleTitles === this.titles.length) {
                this.showDropdown = false;
            }
        }
    }
    activeDropdownTitle() {
        this.activeTitleInDropDown = true;
        this.titles.slice(0, this.numberOfVisibleTitles).map((title) => this.selectedTitle === title ? this.activeTitleInDropDown = false : null);
    }
    calculateDropdownWidth() {
        if (this.activeTitleInDropDown) {
            this.titles.map((currElement, index) => {
                if (this.selectedTitle === currElement) {
                    this.dropdownWidth = this.elementWidthArray[index] + 20;
                }
            });
            this.calculateElementsWithDropDownWidth();
        }
        else {
            this.dropdownWidth = 70; //pixel width of 'More >' dropdown + 20 padding
            this.calculateElementsWithDropDownWidth();
        }
    }
    render() {
        return (h("div", { class: "outer-container", "attr-layout": "row" },
            this.titles.slice(0, this.numberOfVisibleTitles).map((title) => h("div", { id: title.replace(/\s/g, ''), class: 'inner-container' + (this.selectedTitle === title ? ' active' : ''), onClick: () => this.titleSelected(title) }, title)),
            this.showDropdown ? [
                h("yoo-context-menu", null,
                    this.activeDropdownTitle(),
                    h("div", { class: 'inner-container' + (this.activeTitleInDropDown ? ' active' : ''), slot: "trigger", "attr-layout": "row", id: "dropdown" },
                        this.activeTitleInDropDown ? this.selectedTitle : 'More',
                        " ",
                        h("span", { class: "icon" },
                            h("i", { class: "yo-arrow-dropdown" }))),
                    this.titles.slice(this.numberOfVisibleTitles, this.titles.length).map((title) => h("div", { class: 'dropdown' + (this.selectedTitle === title ? ' active' : ''), onClick: () => this.titleSelected(title) }, title)))
            ]
                : null));
    }
    static get is() { return "yoo-navbar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true }, "numberOfVisibleTitles": { "state": true }, "selectedTitle": { "type": String, "attr": "selected-title", "mutable": true }, "showDropdown": { "state": true }, "titles": { "type": "Any", "attr": "titles" } }; }
    static get events() { return [{ "name": "titleClicked", "method": "titleClicked", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-navbar:**/"; }
}
