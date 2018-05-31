import { Component, Element, State, Event, EventEmitter, Method } from '@stencil/core';
import { getElementDimensions } from '../../../utils/helpers';
import { moment } from '@shared/interfaces';
import { isNumber } from 'lodash-es';

@Component({
    tag: 'yoo-form-timer',
    styleUrl: 'form-timer.scss',
    scoped: true
})
export class YooFormTimerComponent {

    @Event() timeCalculated: EventEmitter<string>;

    @State() calculatedTime: any;
    @State() smallWindowSize: boolean = false;

     @Element() host: HTMLStencilElement;

    public startHour: any;
    public startMinute: any;
    public endTime: any;

    componentDidLoad() {
        this.resizeComponent();
        parent.addEventListener('resize', () => this.resizeComponent()); //This implementaion must be used otherwise the host element will become undefined on page resize.
    }

    @Method()
    timeChanged(event: any, position: string) {
        let hours = Number(event.detail.split(':')[0]);
        let minutes = Number(event.detail.split(':')[1]);
        if (isNumber(hours) && isNumber(minutes)) {
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                if (position === 'start') {
                    this.startHour = hours;
                    this.startMinute = minutes;
                } else {
                    this.endTime = moment(this.endTime).hours(hours).minutes(minutes);
                }
            }
        }
        if (this.startHour && this.startMinute && this.endTime) {
            this.calculatedTime = this.formatTime(this.calculateTotalTime());
            this.timeCalculated.emit(this.calculatedTime);
        }
    }

    formatTime(time: string): string {
        let removeDateStringFromCalc = time.split(' ')[4];
        return removeDateStringFromCalc.split(':')[0] + ':' + removeDateStringFromCalc.split(':')[1];
    }

    calculateTotalTime(): string {
        let calcTime = moment(this.endTime).subtract(this.startHour, 'h');
        return moment(calcTime).subtract(this.startMinute, 'm').toLocaleString();
    }

    resizeComponent() {
        const MAX_COMPONENT_WIDTH = 350;
        let width = getElementDimensions(this.host).width;
        MAX_COMPONENT_WIDTH > width ? this.smallWindowSize = true : this.smallWindowSize = false;
    }

    render(): JSX.Element {
        return (
            <div class="outer-container" attr-layout="row">
                <div class="column-container" attr-layout="column">
                    <div class="text-container">
                        TIME IN
            </div>
                    <yoo-form-input type="time" onInputChanged={(event) => this.timeChanged(event, 'start')}></yoo-form-input>
                    {this.smallWindowSize ? [<div class="text-container">TIME OUT</div>, <yoo-form-input type="time" onInputChanged={(event) => this.timeChanged(event, 'end')}></yoo-form-input>] : null}
                </div>
                <div class="column-container" attr-layout="column">
                    <div class="text-container">
                        TOTAL TASK
            </div>
                    <div class="text-container">
                        {this.calculatedTime}
                    </div>
                    <div class="text-container">
                        Hrs Mins
            </div>
                </div>
                {this.smallWindowSize ? null :
                    <div class="column-container" attr-layout="column">
                        <div class="text-container">
                            TIME OUT
            </div>
                        <yoo-form-input type="time" onInputChanged={(event) => this.timeChanged(event, 'end')}></yoo-form-input>
                    </div>
                }
            </div>
        );
    }

}