import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Session } from '../../services/session/session.service';
import { Translate } from '@shared/translate';
import { filter } from 'lodash-es';

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {

    private translate: Translate;
    private decimalPipe: DecimalPipe;

    constructor(translate: Translate, private session: Session) {
        this.translate = translate;
        this.decimalPipe = new DecimalPipe(this.translate.getCurrentAngularLocale());
    }

    transform(value: number, ...args: string[]): any {
        let precision = args && args.length > 0 ? args[0] : 2;

        if (!value && value !== 0) {
            return '';
        }
        if (Math.abs(value) >= 1 || value === 0) {
            precision = precision || 0;
        } else {
            precision = precision || 1;
        }
        let symbol = this.translate.get('CURRENCY');
        let rates = filter(this.session.currencies, c => c.symbol === symbol);

        let rate = 1;
        if (rates.length > 0) {
            rate = rates[0].rate;
        }

        let displayValue = this.decimalPipe.transform(value * rate, '1.0-' + precision.toString());

        if (symbol === '£') {
            return symbol + ' ' + displayValue;
        } else {
            return displayValue + ' ' + symbol;
        }
    }
}
