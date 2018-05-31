import { Injectable } from '@angular/core';

@Injectable()
export class ExifRestorer {

    protected KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    encode64(input) {
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        do {
            chr1 = input[i++];
            chr2 = input[i++];
            chr3 = input[i++];

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.KEY_STR.charAt(enc1) +
                this.KEY_STR.charAt(enc2) +
                this.KEY_STR.charAt(enc3) +
                this.KEY_STR.charAt(enc4);
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);

        return output;
    }

    restore(origFileBase64, resizedFileBase64) {
        if (!origFileBase64.match('data:image/jpeg;base64,')) {
            return resizedFileBase64;
        }

        let rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
        let segments = this.slice2Segments(rawImage);
        let image = this.exifManipulation(resizedFileBase64, segments);

        return 'data:image/jpeg;base64,' + this.encode64(image);

    }

    exifManipulation(resizedFileBase64, segments) {
        let exifArray = this.getExifArray(segments);
        let newImageArray = this.insertExif(resizedFileBase64, exifArray);
        let aBuffer = new Uint8Array(newImageArray);
        return aBuffer;
    }

    getExifArray(segments) {
        let seg;
        for (let x = 0; x < segments.length; x++) {
            seg = segments[x];
            if (seg[0] === 255 && seg[1] === 225) {
                return seg;
            }
        }
        return [];
    }

    insertExif(resizedFileBase64, exifArray) {
        let imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
        let buf = this.decode64(imageData);
        let separatePoint = buf.indexOf(255, 3);
        let mae = buf.slice(0, separatePoint);
        let ato = buf.slice(separatePoint);
        let array = mae;
        array = array.concat(exifArray);
        array = array.concat(ato);
        return array;
    }

    slice2Segments(rawImageArray) {
        let head = 0;
        let segments = [];

        while (1) {
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 218) {
                break;
            }
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 216) {
                head += 2;
            } else {
                let length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                let endPoint = head + length + 2;
                let seg = rawImageArray.slice(head, endPoint);
                segments.push(seg);
                head = endPoint;
            }
            if (head > rawImageArray.length) {
                break;
            }
        }

        return segments;
    }

    decode64(input) {
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        let buf = [];

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let base64test = /[^A-Za-z0-9\+\/\=]/g;
        // if (base64test.exec(input)) {
        //     alert('There were invalid base64 characters in the input text.\n' +
        //         'Valid base64 characters are A-Z, a-z, 0-9, ' + ', ' / ',and ' = '\n' +
        //         'Expect errors in decoding.');
        // }
        input = input.replace(base64test, '');

        do {
            enc1 = this.KEY_STR.indexOf(input.charAt(i++));
            enc2 = this.KEY_STR.indexOf(input.charAt(i++));
            enc3 = this.KEY_STR.indexOf(input.charAt(i++));
            enc4 = this.KEY_STR.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            buf.push(chr1);

            if (enc3 !== 64) {
                buf.push(chr2);
            }
            if (enc4 !== 64) {
                buf.push(chr3);
            }

            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';

        } while (i < input.length);

        return buf;
    }

}
