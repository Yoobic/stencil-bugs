import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { moment } from '@shared/interfaces';

import { isObject } from 'lodash-es';

@Component({
    selector: 'datetime-cell',
    template: `{{value()}}`
})
export class DatetimeRendererComponent implements ICellRendererAngularComp {
    //public static field: any = null;

    private params: any;

    public static renderer(params?: any, format?: string) {//, field?: any, format?: string) {
        let value = DefaultRendererComponent.renderer(params);
        if (isObject(value) && value.value) {
            value = value.value;
        }
        if (value) {
            let date;
            // if (format) {
            //     date = moment(value, format);
            // } else {
            date = moment(value);
            // }
            // if (field && field.columnDefinition && field.columnDefinition.format) {
            //     format = field.columnDefinition.format;
            // } else {
            //     format = 'L LT';
            //}

            return date.format(format || 'L LT');
        }
        return '';
    }

    agInit(params: any) {
        this.params = params;
    }

    public value() {
        return DatetimeRendererComponent.renderer(this.params); //, DatetimeRendererComponent.field);
    }

    refresh(params: any) {
        return false;
    }
}

@Component({
    selector: 'date-cell',
    template: `{{value()}}`
})
export class DateRendererComponent implements ICellRendererAngularComp {
    //public static field: any = null;

    private params: any;

    public static renderer(params?: any, field?: any, format?: string) {
        let value = DefaultRendererComponent.renderer(params);
        if (isObject(value) && value.value) {
            value = value.value;
        }
        if (value) {
            let date;
            // if (format) {
            //     date = moment(value, format);
            // } else {
            date = moment(value);
            // }
            // if (field && field.columnDefinition && field.columnDefinition.format) {
            //     format = field.columnDefinition.format;
            // } else {
            //     format = 'L';
            // }

            return date.format('L');
        }
        return '';
    }

    agInit(params: any) {
        this.params = params;
    }

    public value() {
        return DateRendererComponent.renderer(this.params); //, DatetimeRendererComponent.field);
    }

    refresh(params: any) {
        return false;
    }
}