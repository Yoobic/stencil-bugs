import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {

    constructor() { }

    transform(value, ...args: any[]) {
        if (!args || args.length < 1) {
            return value;
        }
        let query = args[0];
        return query && value && value.replace ?
            value.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') :
            value;
    }

    private escapeRegexp(queryToEscape: string) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
}
