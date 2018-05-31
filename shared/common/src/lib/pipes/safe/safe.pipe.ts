import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string, ...args: any[]): any {
        let mode = 'html';
        if (args && args.length > 0) {
            mode = args[0];
        }
        switch (mode) {
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'resourceurl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'html':
            default:
                return this.sanitizer.bypassSecurityTrustHtml(value);
        }
    }
}
