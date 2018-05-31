import { Pipe, PipeTransform } from '@angular/core';
import { CoreConfig } from '../../services/core-config/core-config.service';
import { Utils } from '../../services/utils/utils.service';
import { isString } from 'lodash-es';

@Pipe({
    name: 'cloudinary'
})
export class CloudinaryPipe implements PipeTransform {

    private ratio = 1;

    constructor(private coreConfig: CoreConfig, private utils: Utils) {
        this.ratio = this.coreConfig.isUniversal() ? 1 : window.devicePixelRatio || 1;
    }

    transform(value: string, ...args: any[]): any {
        //w_{{data.size}},h_{{data.size}},e_blur:1000,c_fill
        //
        if (!isString(value)) {
            return value;
        }
        if (value && value.indexOf('file:') >= 0) {
            value = this.coreConfig.isWKWebView ? this.utils.cleanupWKWebViewImagePath(value) : value;
            return value;
        }

        let isVideo = false;
        if (args && args.length > 7 && args[7]) {
            isVideo = args[7] === true;
        }
        let ratio: number = isVideo ? 1 : this.ratio;

        let protocol = this.coreConfig.getProtocol();
        if (value && value.replace && protocol) {
            value = value.replace('http:', protocol);
        }
        if (value && value.indexOf && value.indexOf('res.cloudinary') >= 0) {
            let cloudinary = '';
            if (args && args.length > 0 && args[0]) {
                cloudinary += 'w_' + Math.floor(parseInt(args[0], 10) * ratio);
                value = value.replace('w_1.0', 'w_' + Math.floor(parseInt(args[0], 10) * ratio));
            }
            if (args && args.length > 1 && args[1]) {
                cloudinary += ',h_' + Math.floor(parseInt(args[1], 10) * ratio);
                value = value.replace('h_1.0', 'h_' + Math.floor(parseInt(args[1], 10) * ratio));
            }
            if (args && args.length > 2 && args[2]) {
                cloudinary += ',e_blur:' + args[2];
            }
            if (args && args.length > 3 && args[3]) {
                cloudinary += ',o_' + args[3];
            }
            if (args && args.length > 4 && args[4]) {
                cloudinary += ',g_faces,z_0.7';
            }
            if (args && args.length > 5 && args[5] && Math.abs(args[5]) > 0) {
                cloudinary += ',e_brightness:' + args[5];
            }
            let isPad = false;
            if (args && args.length > 6 && args[6]) {
                isPad = args[6] === true;
            }

            if (cloudinary) {
                cloudinary += ',';
            }
            if (isVideo) {
                cloudinary += 'c_pad,vc_auto';
                value = value.substr(0, value.lastIndexOf('.')) + '.mp4';
            } else {
                cloudinary += isPad ? 'c_pad' : 'c_fill';
                cloudinary += ',q_auto:low,f_auto,fl_lossy';
            }
            let position = value.indexOf('upload/');
            if (position > 0) {
                position += 7;
                value = [value.slice(0, position), cloudinary + '/', value.slice(position)].join('');
            }

        }
        return value;
    }
}
