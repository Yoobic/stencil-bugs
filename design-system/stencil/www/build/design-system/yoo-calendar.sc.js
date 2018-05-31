/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as pipes } from './chunk-7a5da8d2.js';
import { c as moment___default } from './chunk-b8bd1aac.js';
import './chunk-cdfb4b5d.js';
import './chunk-a7525511.js';
import './chunk-e9552ef3.js';

class YooCalendarComponent {
    constructor() {
        this.displayMode = 'month';
        this.markersNoCount = [{ _id: '2018-05-22' }, { _id: '2018-05-23' }];
        this.coreConfig = window.coreConfigService;
        this.translate = window.translateService;
        // private activeDays: Date[];
        this.today = moment___default(new Date());
        this.weekdays = moment___default.weekdaysShort(true);
        this.slideMonths = [-1, 0, 1];
        this.initialSlide = 1;
        this.cachedSlides = 1;
    }
    componentWillLoad() {
        this.activeDay ? this.setActiveDay(this.activeDay) : this.setActiveDay(new Date());
        this.coreConfig ? this.isMobile = this.coreConfig.isIonic() : this.isMobile = false;
    }
    componentDidLoad() {
        if (this.isMobile) {
            this.ionSlides = this.host.querySelector('ion-slides');
        }
    }
    isActiveDay(day) {
        return moment___default(day).format('L') === moment___default(this.activeDay).format('L');
    }
    isToday(day) {
        return moment___default(day).format('DD MM YY') === this.today.clone().format('DD MM YY');
    }
    setActiveDay(day) {
        this.activeDay = day;
        // let prevActiveDay = moment(this.activeDay).clone().subtract(1, this.displayMode).toDate();
        // let nextActiveDay = moment(this.activeDay).clone().add(1, this.displayMode).toDate();
        // this.activeDays = [prevActiveDay, this.activeDay, nextActiveDay];
        let monthStartDay = moment___default(this.activeDay).startOf(this.displayMode);
        let monthEndDay = moment___default(this.activeDay).endOf(this.displayMode);
        this.setCurrentMonthDays(monthStartDay, monthEndDay);
        this.setPreviousMonthDays(monthStartDay, monthEndDay);
        this.setNextMonthDays(monthStartDay, monthEndDay);
        this.dateChanged.emit({ date: this.activeDay, startDate: monthStartDay.toDate(), endDate: monthEndDay.toDate(), mode: this.displayMode });
    }
    onNext() {
        this.setActiveDay(moment___default(this.activeDay).add(1, this.displayMode).toDate());
    }
    onPrevious() {
        this.setActiveDay(moment___default(this.activeDay).subtract(1, this.displayMode).toDate());
    }
    isNotInCurrentMonth(day, index) {
        let dayToCheck = moment___default(day).format('L');
        if (!index && index !== 0) {
            return this.greyDays.indexOf(dayToCheck) > -1;
        }
    }
    setCurrentMonthDays(monthStartDay, monthEndDay) {
        [this.weeks, this.greyDays] = this.generateCalendarDays(monthStartDay.clone(), monthEndDay.clone());
    }
    setPreviousMonthDays(monthStartDay, monthEndDay) {
        let prevMonthStartDay = monthStartDay.clone().subtract(1, 'months');
        let prevMonthEndDay = monthEndDay.clone().subtract(1, 'months');
        [this.prevWeeks, this.prevGreyDays] = this.generateCalendarDays(prevMonthStartDay, prevMonthEndDay);
    }
    setNextMonthDays(monthStartDay, monthEndDay) {
        let nextMonthStartDay = monthStartDay.clone().add(1, 'months');
        let nextMonthEndDay = monthEndDay.clone().add(1, 'months');
        [this.nextWeeks, this.nextGreyDays] = this.generateCalendarDays(nextMonthStartDay, nextMonthEndDay);
    }
    /**
     *
     * @param currentDay the first day of the Month or Week
     * @param endDay the last day of the Month or Week
     */
    generateCalendarDays(currentDay, endDay) {
        let weeks = [
            []
        ];
        let greyDays = [];
        let startCount = 0;
        if (this.displayMode === 'month') {
            [weeks[0], greyDays] = this.generatePreviousMonthGreyDays(currentDay);
            startCount = greyDays.length;
        }
        weeks = this.generateCurrentMonthDays(currentDay, endDay, weeks, startCount);
        // Keep only populated weeks
        weeks = weeks.filter(w => w.length > 0);
        let lastWeek = weeks[weeks.length - 1];
        let nextMonthGreyDays = [];
        let firstDayInNextMonth = endDay.clone().add(1., 'd');
        [lastWeek, nextMonthGreyDays] = this.generateNextMonthGreyDays(firstDayInNextMonth, lastWeek);
        greyDays = [...greyDays, ...nextMonthGreyDays];
        weeks[weeks.length - 1] = lastWeek;
        return [weeks, greyDays];
    }
    generatePreviousMonthGreyDays(currentDay) {
        let firstWeek = [];
        let previousMonthGreyDays = [];
        let count = 0;
        // First day of the current week
        let indexOfStartWeekDay = this.weekdays.indexOf(moment___default(currentDay).format('ddd'));
        if (indexOfStartWeekDay > 0) {
            while (count < indexOfStartWeekDay) {
                // All all days of the last month which belong to the same week as the current day to the display and record them as greyed out
                let dayInLastMonth = currentDay.clone().subtract(indexOfStartWeekDay - count, 'd');
                previousMonthGreyDays.push(dayInLastMonth.format('L'));
                firstWeek.push(dayInLastMonth.toDate());
                count += 1;
            }
        }
        return [firstWeek, previousMonthGreyDays];
    }
    generateCurrentMonthDays(currentDay, endDay, weeks, startCount) {
        let weekIndex = 0, count = startCount;
        while (currentDay <= endDay) {
            weeks[weekIndex].push(currentDay.toDate());
            // Increment the day
            currentDay = currentDay.clone().add(1, 'd');
            count += 1;
            if (count > 6) {
                // reset count, increment week index
                count = 0;
                weekIndex += 1;
                weeks[weekIndex] = [];
            }
        }
        return weeks;
    }
    generateNextMonthGreyDays(firstDayInNextMonth, lastWeek) {
        let endCount = 0;
        let nextMonthGreyDays = [];
        while (lastWeek.length < 7) {
            let dayInNextMonth = firstDayInNextMonth.clone().add(endCount, 'd');
            nextMonthGreyDays.push(dayInNextMonth.format('L'));
            lastWeek.push(dayInNextMonth.toDate());
            endCount += 1;
        }
        return [lastWeek, nextMonthGreyDays];
    }
    getSliderActiveIndex() {
        if (this.ionSlides) {
            return this.ionSlides.getActiveIndex();
        }
    }
    onNextMobile(event) {
        if (this.ionSlides) {
            let newIndex = event.detail.activeIndex;
            while (newIndex > this.cachedSlides) {
                newIndex--;
                this.slideMonths.push(this.slideMonths[this.slideMonths.length - 1] + 1);
                this.slideMonths.shift();
            }
            try {
                this.ionSlides.slideTo(newIndex, 0, false);
            }
            catch (err) { }
        }
        this.onNext();
    }
    onPreviousMobile(event) {
        if (this.ionSlides) {
            let newIndex = event.detail.activeIndex;
            while (newIndex < this.cachedSlides) {
                newIndex++;
                this.slideMonths.unshift(this.slideMonths[0] - 1);
                this.slideMonths.pop();
            }
            try {
                this.ionSlides.slideTo(newIndex, 0, false);
            }
            catch (err) { }
        }
        this.onPrevious();
    }
    onSetDisplayMode(mode) {
        this.displayMode = mode;
        // Compute the active day to force a re-render
        this.setActiveDay(this.activeDay);
    }
    onSetToday() {
        this.setActiveDay(new Date());
    }
    onSelectDay(day) {
        this.setActiveDay(day);
    }
    getMarker(day) {
        if (this.markers) {
            let retVal = this.markers.find(m => m._id === moment___default(day).format('YYYY-MM-DD'));
            return retVal ? retVal.count : '';
        }
        return '';
    }
    getExtraMarker(day) {
        if (this.extraMarkers) {
            let retVal = this.extraMarkers.find(m => m._id === moment___default(day).format('YYYY-MM-DD'));
            return retVal ? retVal.count : '';
        }
        return '';
    }
    getMarkerNoCount(day) {
        if (this.markersNoCount) {
            let retVal = this.markersNoCount.find(m => m._id === moment___default(day).format('YYYY-MM-DD'));
            return retVal ? true : false;
        }
        return false;
    }
    isNextYear() {
        let nextYearFromToday = moment___default(new Date()).add(1, 'y').format('YYYY');
        let activeDay = moment___default(this.activeDay).format('YYYY');
        return activeDay >= nextYearFromToday;
    }
    isPreviousYear() {
        let lastYearFromToday = moment___default(new Date()).subtract(1, 'y').format('YYYY');
        let activeDay = moment___default(this.activeDay).format('YYYY');
        return activeDay <= lastYearFromToday;
    }
    render() {
        return ([
            this.isMobile ? this.renderMobile() : this.renderWeb()
        ]);
    }
    renderMobile() {
        return ([
            this.renderMobileCalendarHeader(),
            this.renderMobileCalendarSlides()
        ]);
    }
    renderWeb() {
        return ([
            this.renderWebCalendarHeader(),
            h("div", { class: "days", "attr-layout": "column" },
                this.renderWeekHeader(),
                this.renderWeekDays())
        ]);
    }
    renderMarkers(day) {
        return ([
            this.getMarker(day) ? h("div", { class: "marker" }, this.getMarker(day)) : '',
            this.getExtraMarker(day) ? h("div", { class: "marker extra" }, this.getExtraMarker(day)) : '',
            this.getMarkerNoCount(day) ? h("div", { class: "marker no-count" }, this.getMarkerNoCount(day)) : ''
        ]);
    }
    renderWeekDays() {
        return (this.weeks.map(days => h("div", { class: 'week mode-' + this.displayMode, "attr-layout": "row" }, days.map(day => day ? h("div", { class: 'day ' + (this.isToday(day) ? 'today ' : '') + (this.isActiveDay(day) ? 'active ' : '') + (this.isNotInCurrentMonth(day) ? 'grey-day' : ''), "attr-layout": "column", "attr-layout-align": "center center", onClick: this.onSelectDay.bind(this, day) },
            h("div", { class: "day-number", "attr-layout": "row", "attr-layout-align": "center center" }, pipes.dateFormat.transform(day, 'D')),
            h("div", { class: "markers", "attr-layout": "row", "attr-layout-align": "center center" }, this.renderMarkers(day)))
            : null))));
    }
    renderWeekHeader() {
        return (h("div", { class: "week-header", "attr-layout": "row" }, this.weeks[0].map((day) => h("div", { class: "day", "attr-layout": "column", "attr-layout-align": "center center" },
            h("div", { class: "day-text" }, pipes.dateFormat.transform(day, 'ddd'))))));
    }
    renderWebCalendarHeader() {
        return (h("div", { class: "calendar-header" },
            h("div", { class: "toolbar-tools", "attr-layout": "row" },
                h("yoo-tooltip", { placement: "bottom", text: this.translate ? this.translate.get('PREVIOUS') : 'Previous' },
                    h("yoo-button", { class: "icon-only", icon: "yo-left", onButtonClicked: this.onPrevious.bind(this) })),
                h("yoo-tooltip", { placement: "bottom", text: this.translate ? this.translate.get('NEXT') : 'Next' },
                    h("yoo-button", { class: "icon-only", icon: "yo-right", onButtonClicked: this.onNext.bind(this) })),
                h("yoo-button", { class: "medium", text: this.translate ? this.translate.get('TODAY') : 'Today', onButtonClicked: this.onSetToday.bind(this) }),
                h("h2", { class: "active-day" }, pipes.dateFormat.transform(this.activeDay, 'LL')),
                h("yoo-button", { class: 'medium ' + (this.displayMode === 'week' ? 'success' : ''), text: this.translate ? this.translate.get('WEEK') : 'Week', onButtonClicked: this.onSetDisplayMode.bind(this, 'week') }),
                h("yoo-button", { class: 'medium ' + (this.displayMode === 'month' ? 'success' : ''), text: this.translate ? this.translate.get('MONTH') : 'Month', onButtonClicked: this.onSetDisplayMode.bind(this, 'month') }))));
    }
    renderMobileCalendarHeader() {
        return (h("div", { class: "mobile-calendar-header", "attr-layout": "row" },
            h("div", { class: "active-month-container" },
                h("span", { onClick: this.onPrevious.bind(this), class: "prev-month" },
                    h("i", { class: "yo-left" })),
                h("span", { class: "active-month" }, (this.isPreviousYear() || this.isNextYear()) ? pipes.dateFormat.transform(this.activeDay, 'MMM YYYY') : pipes.dateFormat.transform(this.activeDay, 'MMM')),
                h("span", { onClick: this.onNext.bind(this), class: "next-month" },
                    h("i", { class: "yo-right" }))),
            h("div", { class: "calendar-tools" },
                h("span", { class: 'calendar-toggle today', onClick: this.onSetToday.bind(this) }, this.translate ? this.translate.get('TODAY') : 'today'),
                h("span", { class: 'calendar-toggle ' + (this.displayMode === 'week' ? 'active' : ''), onClick: this.onSetDisplayMode.bind(this, 'week') }, this.translate ? this.translate.get('WEEK') : 'week'),
                h("span", { class: 'calendar-toggle ' + (this.displayMode === 'month' ? 'active' : ''), onClick: this.onSetDisplayMode.bind(this, 'month') }, this.translate ? this.translate.get('MONTH') : 'month'))));
    }
    renderMobileCalendarSlides() {
        return (h("ion-slides", { onIonSlideNextEnd: (event) => this.onNextMobile(event), onIonSlidePrevEnd: (event) => this.onPreviousMobile(event), options: { initialSlide: this.initialSlide, pagination: 'custom' } }, this.slideMonths.map((slide, index) => h("ion-slide", { "attr-layout": "column" },
            h("div", { class: "mobile-days", "attr-layout": "column" },
                this.renderWeekHeader(),
                this.renderWeekDays())))));
    }
    static get is() { return "yoo-calendar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activeDay": {
            "type": "Any",
            "attr": "active-day",
            "mutable": true
        },
        "displayMode": {
            "type": String,
            "attr": "display-mode",
            "mutable": true
        },
        "extraMarkers": {
            "type": "Any",
            "attr": "extra-markers"
        },
        "host": {
            "elementRef": true
        },
        "markers": {
            "type": "Any",
            "attr": "markers"
        },
        "markersNoCount": {
            "type": "Any",
            "attr": "markers-no-count"
        }
    }; }
    static get events() { return [{
            "name": "dateChanged",
            "method": "dateChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center; }\n  [data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar]   yoo-tooltip[data-yoo-calendar] {\n    padding: 0.25rem; }\n    [data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar]   yoo-tooltip[data-yoo-calendar]   yoo-button[data-yoo-calendar] {\n      padding: 0; }\n  [data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar]   h2[data-yoo-calendar] {\n    text-transform: capitalize;\n    font-weight: 500; }\n  [data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar]   yoo-button[data-yoo-calendar] {\n    padding: 0.25rem; }\n  [data-yoo-calendar-host]   .toolbar-tools[data-yoo-calendar]   .active-day[data-yoo-calendar] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 2 auto;\n    -ms-flex: 1 2 auto;\n    flex: 1 2 auto;\n    text-align: center; }\n\n[data-yoo-calendar-host]   .week-header[data-yoo-calendar] {\n  min-height: 1.875rem;\n  background: var(--light, #FFFFFF);\n  font-size: 0.8125rem;\n  font-weight: 400;\n  margin-bottom: 0.875rem; }\n  [data-yoo-calendar-host]   .week-header[data-yoo-calendar]   .day[data-yoo-calendar] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    text-align: center;\n    font-size: 0.875rem;\n    font-weight: 400;\n    font-style: normal;\n    line-height: normal;\n    padding: 0.3125rem; }\n\n[data-yoo-calendar-host]   .week[data-yoo-calendar] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  border-bottom: 1px solid #E1E8EE; }\n  [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day[data-yoo-calendar] {\n    margin-top: 0.3125rem;\n    height: 3.4375rem;\n    text-align: center;\n    cursor: pointer;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1; }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day.grey-day[data-yoo-calendar] {\n      opacity: 0.3; }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day.today.active[data-yoo-calendar]   .day-number[data-yoo-calendar] {\n      background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n      color: var(--light, #FFFFFF); }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day.today[data-yoo-calendar]   .day-number[data-yoo-calendar] {\n      color: var(--success, #2EDBB7); }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day.active[data-yoo-calendar]   .day-number[data-yoo-calendar] {\n      background: var(--black, #000000);\n      color: var(--light, #FFFFFF); }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .day[data-yoo-calendar]   .day-number[data-yoo-calendar] {\n      width: 2.0625rem;\n      height: 2.0625rem;\n      line-height: normal;\n      font-style: normal;\n      font-weight: 400;\n      font-size: 1.0625rem;\n      border-radius: 50%;\n      min-width: 1.625rem; }\n  [data-yoo-calendar-host]   .week[data-yoo-calendar]   .markers[data-yoo-calendar] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    min-height: 1.3125rem; }\n    [data-yoo-calendar-host]   .week[data-yoo-calendar]   .markers[data-yoo-calendar]   .marker[data-yoo-calendar] {\n      font-size: 0.625rem;\n      border-radius: 50%;\n      height: 1rem;\n      width: 1rem;\n      line-height: 1rem;\n      background: var(--accent, #1FB6FF);\n      color: var(--light, #FFFFFF);\n      margin-right: 0.0625rem; }\n      [data-yoo-calendar-host]   .week[data-yoo-calendar]   .markers[data-yoo-calendar]   .marker.extra[data-yoo-calendar] {\n        background: var(--warning, #ff6402); }\n      [data-yoo-calendar-host]   .week[data-yoo-calendar]   .markers[data-yoo-calendar]   .marker.no-count[data-yoo-calendar] {\n        background: var(--success, #2EDBB7);\n        width: 0.3125rem;\n        height: 0.3125rem; }\n\n[data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  margin-bottom: 1.25rem; }\n  [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .active-month-container[data-yoo-calendar] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: baseline;\n    -webkit-align-items: baseline;\n    -ms-flex-align: baseline;\n    align-items: baseline; }\n    [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .active-month-container[data-yoo-calendar]   .prev-month[data-yoo-calendar] {\n      color: var(--stable-alt, #d0d0d0);\n      padding: 0rem 0.3125rem 0rem 0.9375rem; }\n    [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .active-month-container[data-yoo-calendar]   .next-month[data-yoo-calendar] {\n      color: var(--stable-alt, #d0d0d0);\n      padding-left: 0.3125rem; }\n    [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .active-month-container[data-yoo-calendar]   .active-month[data-yoo-calendar] {\n      color: var(--black, #000000);\n      font-size: 1.3125rem;\n      font-weight: 400;\n      line-height: normal;\n      font-style: normal; }\n  [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end; }\n    [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar]   .calendar-toggle[data-yoo-calendar] {\n      padding-right: 0.9375rem;\n      font-size: 0.875rem;\n      font-weight: 400;\n      font-style: normal;\n      line-height: normal;\n      color: var(--stable-alt, #d0d0d0); }\n      [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar]   .calendar-toggle[data-yoo-calendar]:last-child {\n        padding-right: 0.4375rem; }\n      [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar]   .calendar-toggle.today[data-yoo-calendar]:hover {\n        color: var(--success, #2EDBB7); }\n      [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar]   .calendar-toggle.active[data-yoo-calendar] {\n        color: var(--success, #2EDBB7); }\n\n[data-yoo-calendar-host]   .mobile-days[data-yoo-calendar] {\n  width: 100%; }\n\n\@media only screen and (max-width: 350px) {\n  [data-yoo-calendar-host]   .mobile-calendar-header[data-yoo-calendar]   .calendar-tools[data-yoo-calendar]   .calendar-toggle[data-yoo-calendar] {\n    max-width: 4rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; } }"; }
}

export { YooCalendarComponent as YooCalendar };
