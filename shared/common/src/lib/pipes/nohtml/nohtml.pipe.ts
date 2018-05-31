import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nohtml' })
export class NohtmlPipe implements PipeTransform {
    constructor() { }

    transform(value: string, ...args: any[]): any {
        // if (!value) {
        //     return '';
        // }
        // return value.replace(/<\/p>/gm, '\n').replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/gm, '\n').replace(/&#(\d+);/g, function(match, dec) {
        //     return String.fromCharCode(dec);
        // });
        return value || '';
    }
}
