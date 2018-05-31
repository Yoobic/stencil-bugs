import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { ICalendarMarker, IDateChange } from '@shared/interfaces';
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';

import moment from 'moment';

@Component({
    tag: 'yoo-calendar',
    styleUrl: 'calendar.scss',
    scoped: true
})
export class YooCalendarComponent {

    @Prop({ mutable: true }) activeDay: Date;
    @Prop({ mutable: true }) displayMode: 'month' | 'week' = 'month';
    @Prop() markers: ICalendarMarker[];
    @Prop() extraMarkers: ICalendarMarker[];
    @Prop() markersNoCount: Array<{ _id: string }>;

    @Event() dateChanged: EventEmitter<IDateChange>;

    @Element() host: HTMLStencilElement;

    private weeks: Array<Array<Date>>;
    private today: moment.Moment = moment(new Date());
    private weekdays: string[] = moment.weekdaysShort(true);
    private greyDays: string[];
    private prevWeeks: Array<Array<Date>>;
    private prevGreyDays: string[];
    private nextWeeks: Array<Array<Date>>;
    private nextGreyDays: string[];

    private ionSlides: HTMLIonSlidesElement;
    private slideMonths: number[] = [-1, 0, 1];
    private slideMonthsWeeks: Array<Array<Array<Date>>>;
    private activeDays: Array<Date>;
    private initialSlide: number = 1;
    private cachedSlides: number = 1;
    private currentSlideIndex: number = 1;


    componentWillLoad() {
        this.activeDay ? this.setActiveDay(this.activeDay) : this.setActiveDay(new Date());
    }

    componentDidLoad() {
        if (services.coreConfig.isIonic()) {
            this.ionSlides = this.host.querySelector('ion-slides');
        }
    }

    isActiveDay(day: Date) {
        return moment(day).format('L') === moment(this.activeDay).format('L');
    }

    isToday(day: Date) {
        return moment(day).format('DD MM YY') === this.today.clone().format('DD MM YY');
    }

    isNextYear() {
        let nextYearFromToday = moment(new Date()).add(1, 'y').format('YYYY');
        let activeDay = moment(this.activeDay).format('YYYY');
        return activeDay >= nextYearFromToday;
    }

    isPreviousYear() {
        let lastYearFromToday = moment(new Date()).subtract(1, 'y').format('YYYY');
        let activeDay = moment(this.activeDay).format('YYYY');
        return activeDay <= lastYearFromToday;
    }

    isNotInCurrentMonth(day: Date, slideIndex?: number) {
        let dayToCheck = moment(day).format('L');
        if (!slideIndex && slideIndex !== 0) {
            return this.greyDays.indexOf(dayToCheck) > -1;
        } else {
            if (slideIndex === 1) {
                return this.greyDays.indexOf(dayToCheck) > -1;
            } else if (slideIndex === 2) {
                return this.nextGreyDays.indexOf(dayToCheck) > -1;
            } else if (slideIndex === 0) {
                return this.prevGreyDays.indexOf(dayToCheck) > -1;
            }
        }
    }

    // This method has a bug related to swiper on the ionic side
    // getSliderActiveIndex() {
    //     if (this.ionSlides) {
    //         return this.ionSlides.getActiveIndex();
    //     }
    // }

    setActiveDay(day: Date) {
        this.activeDay = day;
        let prevActiveDay = moment(this.activeDay).clone().subtract(1, this.displayMode).toDate();
        let nextActiveDay = moment(this.activeDay).clone().add(1, this.displayMode).toDate();
        this.activeDays = [prevActiveDay, this.activeDay, nextActiveDay];

        let monthStartDay = moment(this.activeDay).startOf(this.displayMode);
        let monthEndDay = moment(this.activeDay).endOf(this.displayMode);

        this.setCurrentMonthDays(monthStartDay, monthEndDay);
        this.setPreviousMonthDays(monthStartDay, monthEndDay);
        this.setNextMonthDays(monthStartDay, monthEndDay);
        this.slideMonthsWeeks = [this.prevWeeks, this.weeks, this.nextWeeks];

        this.dateChanged.emit({ date: this.activeDay, startDate: monthStartDay.toDate(), endDate: monthEndDay.toDate(), mode: this.displayMode });
    }

    setCurrentMonthDays(monthStartDay: moment.Moment, monthEndDay: moment.Moment) {
        [this.weeks, this.greyDays] = this.generateCalendarDays(monthStartDay.clone(), monthEndDay.clone());
    }

    setPreviousMonthDays(monthStartDay: moment.Moment, monthEndDay: moment.Moment) {
        let prevMonthStartDay = monthStartDay.clone().subtract(1, 'months');
        let prevMonthEndDay = monthEndDay.clone().subtract(1, 'months');
        [this.prevWeeks, this.prevGreyDays] = this.generateCalendarDays(prevMonthStartDay, prevMonthEndDay);
    }

    setNextMonthDays(monthStartDay: moment.Moment, monthEndDay: moment.Moment) {
        let nextMonthStartDay = monthStartDay.clone().add(1, 'months');
        let nextMonthEndDay = monthEndDay.clone().add(1, 'months');
        [this.nextWeeks, this.nextGreyDays] = this.generateCalendarDays(nextMonthStartDay, nextMonthEndDay);
    }

    /**
     *
     * @param currentDay the first day of the Month or Week
     * @param endDay the last day of the Month or Week
     */
    generateCalendarDays(currentDay: moment.Moment, endDay: moment.Moment) {
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

    generatePreviousMonthGreyDays(currentDay: moment.Moment) {
        let firstWeek = [];
        let previousMonthGreyDays = [];
        let count = 0;
        // First day of the current week
        let indexOfStartWeekDay = this.weekdays.indexOf(moment(currentDay).format('ddd'));
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

    generateCurrentMonthDays(currentDay: moment.Moment, endDay: moment.Moment, weeks, startCount) {
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

    generateNextMonthGreyDays(firstDayInNextMonth: moment.Moment, lastWeek: Date[]) {
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

    onSlideChanged(event: CustomEvent) {
        if (this.ionSlides) {
            // Initial active index = 1;
            let activeIndex = event.detail.activeIndex;
            if (activeIndex > this.currentSlideIndex) {
                // need to reduce the index if too big
                this.onNextMobile(activeIndex - 1);
            } else if (activeIndex < this.currentSlideIndex) {
                // Going to the previous month maintains the activeIndex = 0
                this.onPreviousMobile(activeIndex);
            }
        }
    }

    onNextMobile(activeSlideIndex: number): void {
        if (this.ionSlides) {
            while (activeSlideIndex > this.cachedSlides) {
                activeSlideIndex--;
                this.slideMonths.push(this.slideMonths[this.slideMonths.length - 1] + 1);
                this.slideMonths.shift();
            }
            try {
                this.ionSlides.slideTo(activeSlideIndex, 0, false);
            } catch (err) { }
        }
        this.onNext();
    }

    onPreviousMobile(activeSlideIndex: number): void {
        if (this.ionSlides) {
            while (activeSlideIndex < this.cachedSlides) {
                activeSlideIndex++;
                this.slideMonths.unshift(this.slideMonths[0] - 1);
                this.slideMonths.pop();
            }
            try {
                this.ionSlides.slideTo(activeSlideIndex, 0, false);
            } catch (err) { }
        }
        this.onPrevious();
    }

    onNext() {
        this.setActiveDay(moment(this.activeDay).add(1, this.displayMode).toDate());
    }

    onPrevious() {
        this.setActiveDay(moment(this.activeDay).subtract(1, this.displayMode).toDate());
    }

    onSetDisplayMode(mode: 'month' | 'week'): void {
        this.displayMode = mode;
        // Compute the active day to force a re-render
        this.setActiveDay(this.activeDay);
    }

    onSetToday(): void {
        this.setActiveDay(new Date());
    }

    onSelectDay(day: Date): void {
        this.setActiveDay(day);
    }

    getMarker(day: Date) {
        if (this.markers) {
            let retVal = this.markers.find(m => m._id === moment(day).format('YYYY-MM-DD'));
            return retVal ? retVal.count : '';
        }
        return '';
    }

    getExtraMarker(day: Date) {
        if (this.extraMarkers) {
            let retVal = this.extraMarkers.find(m => m._id === moment(day).format('YYYY-MM-DD'));
            return retVal ? retVal.count : '';
        }
        return '';
    }

    getMarkerNoCount(day: Date) {
        if (this.markersNoCount) {
            let retVal = this.markersNoCount.find(m => m._id === moment(day).format('YYYY-MM-DD'));
            return retVal ? true : false;
        }
        return false;
    }

    render(): JSX.Element {
        return ([
            services.coreConfig.isIonic() ? this.renderMobileCalendar() : this.renderWebCalendar()
        ]);
    }

    renderMobileCalendar(): JSX.Element {
        return (
            <ion-slides onIonSlideDidChange={(event: CustomEvent) => this.onSlideChanged(event)}
                options={{ initialSlide: this.initialSlide, pagination: 'custom' }}>
                {this.slideMonths.map((slide, index) =>
                    <ion-slide attr-layout="column">
                        {this.renderCalendarHeaderMobile(index)}
                        <div class="mobile-days" attr-layout="column">
                            {this.renderWeekHeader()}
                            {this.renderWeekDaysMobile(index)}
                        </div>
                    </ion-slide>
                )}
            </ion-slides>
        );
    }


    renderWebCalendar(): JSX.Element {
        return ([
            this.renderCalendarHeaderWeb(),
            <div class="days" attr-layout="column">
                {this.renderWeekHeader()}
                {this.renderWeekDaysWeb()}
            </div>
        ]);
    }

    renderDay(day: Date, slideIndex?: number) {
        return (
            day ?
            <div class={'day ' + (this.isToday(day) ? 'today ' : '') + (this.isActiveDay(day) ? 'active ' : '') + (this.isNotInCurrentMonth(day, slideIndex) ? 'grey-day' : '')}
                attr-layout="column" attr-layout-align="center center"
                onClick={this.onSelectDay.bind(this, day)}>
                <div class="day-number" attr-layout="row" attr-layout-align="center center">{pipes.dateFormat.transform(day, 'D')}</div>
                <div class="markers" attr-layout="row" attr-layout-align="center center">
                    {this.renderMarkers(day)}
                </div>
            </div>
            : null
        );
    }

    renderMarkers(day: Date): JSX.Element {
        return ([
            this.getMarker(day) ? <div class="marker">{this.getMarker(day)}</div> : '',
            this.getExtraMarker(day) ? <div class="marker extra">{this.getExtraMarker(day)}</div> : '',
            this.getMarkerNoCount(day) ? <div class="marker no-count">{this.getMarkerNoCount(day)}</div> : ''
        ]);
    }

    renderWeekHeader(): JSX.Element {
        return (
            <div class="week-header" attr-layout="row">
                {this.weeks[0].map((day) =>
                    <div class="day" attr-layout="column" attr-layout-align="center center">
                        <div class="day-text">{pipes.dateFormat.transform(day, 'ddd')}</div>
                    </div>
                )}
            </div>
        );
    }

    renderWeekDaysWeb(): JSX.Element {
        return (
            this.weeks.map(days =>
                <div class={'week mode-' + this.displayMode} attr-layout="row">
                    {days.map(day =>
                        this.renderDay(day)
                    )}
                </div>
            )
        );
    }

    renderCalendarHeaderWeb(): JSX.Element {
        return (
            <div class="calendar-header">
                <div class="toolbar-tools" attr-layout="row">
                    <yoo-tooltip placement="bottom" text={services.translate.get('PREVIOUS')}>
                        <yoo-button class="icon-only" icon="yo-left" onClick={this.onPrevious.bind(this)}></yoo-button>
                    </yoo-tooltip>
                    <yoo-tooltip placement="bottom" text={services.translate.get('NEXT')}>
                        <yoo-button class="icon-only" icon="yo-right" onClick={this.onNext.bind(this)}></yoo-button>
                    </yoo-tooltip>
                    <yoo-button class="medium"
                        text={services.translate.get('TODAY')}
                        onClick={this.onSetToday.bind(this)}
                    ></yoo-button>
                    <h2 class="active-day">{pipes.dateFormat.transform(this.activeDay, 'LL')}</h2>
                    <yoo-button class={'medium ' + (this.displayMode === 'week' ? 'success' : '')}
                        text={services.translate.get('WEEK')}
                        onClick={this.onSetDisplayMode.bind(this, 'week')}
                    ></yoo-button>
                    <yoo-button class={'medium ' + (this.displayMode === 'month' ? 'success' : '')}
                        text={services.translate.get('MONTH')}
                        onClick={this.onSetDisplayMode.bind(this, 'month')}
                    ></yoo-button>
                </div>
            </div>
        );
    }

    renderWeekDaysMobile(slideIndex: number) {
        return (
            this.slideMonthsWeeks[slideIndex].map(days =>
                <div class={'week mode-' + this.displayMode} attr-layout="row">
                {days.map(day =>
                    this.renderDay(day, slideIndex)
                )}
            </div>
            )
        );
    }

    renderCalendarHeaderMobile(slideIndex: number): JSX.Element {
        return (
            <div class="mobile-calendar-header" attr-layout="row">
                <div class="active-month-container">
                    <span onClick={this.onPrevious.bind(this)} class="prev-month"><i class="yo-left"></i></span>
                    <span class="active-month">
                        {(this.isPreviousYear() || this.isNextYear()) ? pipes.dateFormat.transform(this.activeDays[slideIndex], 'MMM YYYY') : pipes.dateFormat.transform(this.activeDays[slideIndex], 'MMM')}
                    </span>
                    <span onClick={this.onNext.bind(this)} class="next-month"><i class="yo-right"></i></span>
                </div>
                <div class="calendar-tools">
                    <span class={'calendar-toggle today'} onClick={this.onSetToday.bind(this)}>
                        {services.translate.get('TODAY')}
                    </span>
                    <span class={'calendar-toggle ' + (this.displayMode === 'week' ? 'active' : '')} onClick={this.onSetDisplayMode.bind(this, 'week')}>
                        {services.translate.get('WEEK')}
                    </span>
                    <span class={'calendar-toggle ' + (this.displayMode === 'month' ? 'active' : '')} onClick={this.onSetDisplayMode.bind(this, 'month')}>
                        {services.translate.get('MONTH')}
                    </span>
                </div>
            </div>
        );
    }
}
