import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from '../../services/translate/translate.service';

@Pipe({
    name: 'polyglot'
})
export class PolyglotPipe implements PipeTransform {
    constructor(private translate: Translate) { }

    transform(value: string, ...args: string[]): any {
        return this.translate.polyglot(value);
    }
}
