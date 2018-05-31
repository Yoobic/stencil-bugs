import { Pipe, PipeTransform } from '@angular/core';
import { CoreConfig } from '../../services/core-config/core-config.service';
import { Utils } from '../../services/utils/utils.service';

@Pipe({ name: 'https' })
export class HttpsPipe implements PipeTransform {
    constructor(private coreConfig: CoreConfig, private utils: Utils) { }

    transform(value: string, ...args: any[]): any {
        if (value && value.replace) {
            let protocol = this.coreConfig.getProtocol();
            value = value.replace(/http:/g, protocol);
            if (this.coreConfig.isWKWebView() && value.indexOf('file:') >= 0) {
                value = this.utils.cleanupWKWebViewImagePath(value);
            }
        }
        return value;
    }
}
