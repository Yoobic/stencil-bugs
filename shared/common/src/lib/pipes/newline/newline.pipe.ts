import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'newline'
})
export class NewlinePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: string): any {
        let result;
        if (value && value.replace) {
            result = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
            result = this.sanitizer.bypassSecurityTrustHtml(result);
        }

        return result ? result : value;
    }
}
