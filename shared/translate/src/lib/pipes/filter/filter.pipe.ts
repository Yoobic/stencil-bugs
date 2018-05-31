import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from '../../services/translate/translate.service';
import { isBlank } from '@shared/common';
import { keys as _keys } from 'lodash-es';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

    private translate: Translate;

    constructor(translate: Translate) {
        this.translate = translate;
    }

    transform(value: Array<any>, ...args: any[]): any {
        if (!args || (!args[0])) {
            return value;
        } else if (value) {
            const translate = args[3];
            return value.filter(item => {
                if (typeof item === 'string') {
                    return item && this.getStringToTest(item, translate).toLowerCase().indexOf(args[0].toLowerCase()) >= 0;
                }
                let keys = args[1] || _keys(item);
                keys = [].concat(keys);

                let retVal = false;
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (args[0] && args[0].toLowerCase) {
                        if ((typeof item[key] === 'string' || item[key] instanceof String)) {
                            let index = this.getStringToTest(item[key], translate).toLowerCase().indexOf(args[0].toLowerCase());
                            retVal = retVal || (args[2] === false ? index < 0 : index >= 0);
                        }
                    } else if (!args[0] && args[1]) {
                        let bool = item.hasOwnProperty(key) && !isBlank(item[key]);
                        retVal = retVal || (args[2] === false ? !bool : bool);
                    }
                }
                return retVal;
            });
        }
    }

    getStringToTest(s: string, translate: boolean): string {
        if (translate && this.translate) {
            return this.translate.get(s.toString().toUpperCase());
        } else {
            return s;
        }
    }
}