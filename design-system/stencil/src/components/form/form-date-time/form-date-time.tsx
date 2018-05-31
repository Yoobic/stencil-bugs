import { Component, Element, Event, EventEmitter, Prop, State, Method } from '@stencil/core';
import { FormFieldType, IFormDatetime, ValidatorEntry, Validator, moment } from '@shared/interfaces';
import { setValidator, onInputBlurred, setValueAndValidateInput, onInputFocused, onInputClear, convertValueForInputType } from '../../../utils/helpers/form-input-helpers';
import { isPresent } from '../../../utils/helpers/helpers';
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';

import flatpickr from 'flatpickr';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
    tag: 'yoo-form-date-time',
    styleUrl: 'form-date-time.scss',
    scoped: true
})
export class YooFormDateTimeComponent implements IFormDatetime {

    @Prop({ mutable: true }) value: any;
    @Prop() type: string = 'date';
    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];
    @Prop() placeholder: string;
    @Prop() placeholdertolabel: boolean;
    @Prop() required: boolean;
    @Prop() readonly: boolean;
    @Prop() iconPrefix: string;
    @Prop() iconSuffix: string;
    @Prop() showInputClear: boolean = false;
    @Prop() minDate: Date;
    @Prop() maxDate: Date;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Event() iconClicked: EventEmitter<string>;

    @State() isLabelAboveVisible: boolean;
    @State() validity: boolean;
    @State() isCordovaDatePicker: boolean;
    @State() isDatePickerOpen: boolean;

    @Element() host: HTMLElement;
    inputTypeState: string;

    @Method()
    isValid() {
        return this.validity;
    }

    componentWillLoad() {
        setValidator(this);
        this.isCordovaDatePicker = services.coreConfig.isCordova() && [FormFieldType.date, FormFieldType.time, FormFieldType.datetime].indexOf(this.type) >= 0;
        this.inputTypeState = this.isCordovaDatePicker ? this.type : 'text';
    }

    componentDidLoad() {
        if (!this.isCordovaDatePicker && !this.readonly) {
            let config = this.buildDatePickerConfig();
            flatpickr(this.host.querySelector('input') as any, config);
        }
    }

    buildDatePickerConfig() {
        let config: any = {
            defaultDate: moment(new Date()).format('YYYY-MM-DD'),
            allowInput: true,
            disableMobile: true
        };
        switch (this.type) {
            case FormFieldType.date:
                config.enableTime = false;
                config.dateFormat = 'Y-m-d';
                break;
            case FormFieldType.time:
                config.enableTime = true;
                config.dateFormat = 'H:i';
                config.noCalendar = true;
                break;
            case FormFieldType.datetime:
                config.enableTime = true;
                config.dateFormat = 'Y-m-d H:i';
                break;
            default:
                config.enableTime = false;
                config.dateFormat = 'Y-m-d';
        }
        if (this.minDate) {
            config.minDate = this.minDate;
        }
        if (this.maxDate) {
            config.maxDate = this.maxDate;
        }

        return config;
    }

    onInputChanged(ev: any): void {
        let value = convertValueForInputType(ev.target.value, this.type);
        setValueAndValidateInput(value, this);
    }

    convertTimeToDate(timestr) {
        let currentDate = new Date();
        let time = timestr.split(':');
        currentDate.setHours(time[0]);
        currentDate.setMinutes(time[1]);
        return currentDate;
    }

    getDisplayValue() {
        switch (this.type) {
            case FormFieldType.time: {
                if (!isPresent(this.value)) {
                    return null;
                } else {
                    let val = moment(this.value);
                    return val.isValid() ? val.format('HH:mm:ss') : this.value;
                }
            }

            default:
                return this.value;
        }
    }

    onInputClick(ev) {
        if (this.isCordovaDatePicker) {
            if (ev && ev.stopPropagation) {
                ev.stopPropagation();
                ev.preventDefault();

                // force blur on previously focused input
                let activeElement: any = document.activeElement;
                if (activeElement) {
                    activeElement.blur();
                }
            }
            let initValue = this.value ? moment(this.value).toDate() : new Date();
            let minDate, maxDate;
            if (services.coreConfig.isIOS()) {
                minDate = this.minDate ? moment(this.minDate).toDate() : moment().subtract(100, 'years').toDate();
                maxDate = this.maxDate ? moment(this.maxDate).toDate() : moment().add(100, 'years').toDate();
            } else if (services.coreConfig.isAndroid()) {
                minDate = this.minDate ? (moment(this.minDate).toDate()).valueOf() : (moment().subtract(100, 'years').toDate()).valueOf();
                maxDate = this.maxDate ? (moment(this.maxDate).toDate()).valueOf() : (moment().add(100, 'years').toDate()).valueOf();
            }

            if (!this.isDatePickerOpen) {
                this.isDatePickerOpen = true;
                DatePicker.show({
                    date: initValue,
                    mode: this.type === FormFieldType.datetime ? 'datetime' : this.type,
                    minDate: minDate,
                    maxDate: maxDate,
                    is24Hour: services.translate.getCurrentLanguage() !== 'en',
                    okText: services.translate.get('OK'),
                    cancelText: services.translate.get('CANCEL'),
                    todayText: services.translate.get('TODAY'),
                    doneButtonLabel: services.translate.get('DONE'),
                    locale: services.translate.getCurrentLanguageFull(),
                    nowText: services.translate.get('NOW'),
                    cancelButtonLabel: services.translate.get('CANCEL'),
                    androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
                }).then(date => {
                    this.isDatePickerOpen = false;
                    setValueAndValidateInput(date, this);
                }, err => {
                    this.isDatePickerOpen = false;
                }).catch(() => {
                    this.isDatePickerOpen = false;
                });
            }
        }
    }

    onDateInputFocused(ev) {
        // prevent the native date picker fired up when the input is focused
        if (this.isCordovaDatePicker) {
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        onInputFocused(ev, this);
    }

    getReadOnlyValue() {
        switch (this.type) {
            case FormFieldType.date:
                return pipes.dateFormat.transform(this.value, 'L');
            case FormFieldType.datetime:
                return pipes.dateFormat.transform(this.value, 'L LT');
            case FormFieldType.time:
                return pipes.dateFormat.transform(this.value, 'LT');
            default:
                return pipes.dateFormat.transform(this.value, 'L');
        }

    }
    renderReadonly() {
        return <div class="readonly">{this.getReadOnlyValue()}</div>;
    }

    renderEditable() {
        return <div class="input-container">
            {this.iconPrefix ?
                <div class="icon-prefix" attr-layout="row">
                    <i class={this.iconPrefix}></i>
                </div> : null}
            <input type={this.inputTypeState}
                placeholder={!this.placeholdertolabel || !this.isLabelAboveVisible ? this.placeholder : ''}
                value={this.getDisplayValue()}
                required={this.required}
                onBlur={ev => onInputBlurred(ev, this)}
                onInput={ev => this.onInputChanged(ev)}
                onFocus={ev => this.onDateInputFocused(ev)}
                onClick={ev => this.onInputClick(ev)}
            />
            {this.showInputClear ?
                <div class="icon-suffix" onClick={ev => onInputClear(ev, this)} attr-layout="row">
                    <i class="yo-close" title="Clear"></i>
                </div>
                : null}
        </div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
