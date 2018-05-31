import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Translate } from '../../services/translate/translate.service';

import { isNumber } from 'lodash-es';
@Pipe({ name: 'distance' })
export class DistancePipe implements PipeTransform {

    private decimalPipe: DecimalPipe;
    private translate: Translate;

    constructor(translate: Translate) {
        this.translate = translate;
        this.decimalPipe = new DecimalPipe(this.translate.getCurrentAngularLocale());
    }

    transform(value: number, ...args: any[]): any {
        if (!value && !isNumber(value)) {
            return '';
        }
        const unit = this.translate.get('DISTANCEUNIT');
        if (unit === 'mi') {
            value = value / 1.609;
            if (value > 1) {
                return this.decimalPipe.transform(value, '1.0-0') + ' ' + unit;
            } else {
                return this.decimalPipe.transform(value, '1.0-1') + ' ' + unit;
            }
        } else {
            if (value > 1) {
                return this.decimalPipe.transform(value, '1.0-0') + ' k' + unit;
            } else {
                return this.decimalPipe.transform(value * 1000, '1.0-0') + ' ' + unit;
            }
        }
    }
}