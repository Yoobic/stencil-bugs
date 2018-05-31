import postscribe from 'postscribe';
import { isString } from 'lodash-es';
import ResizeObserver from 'resize-observer-polyfill';
import 'intersection-observer';
export function loadScript(url) {
    return new Promise((resolve) => {
        let element = document.getElementsByTagName('head')[0];
        let html = `<script async type=text/javascript src=${url}></script>`;
        postscribe(element, html, {
            done: () => {
                resolve(true);
            }
        });
    });
}
export function getProtocol() {
    //let protocol = this.isCordova() || this.isElectron() || this.isUniversal() ? 'https:' : window.location.protocol;
    let protocol = 'https:';
    return protocol;
}
export function cloudinary(value, width, height, blur, opacity, trackFaces, brightness, pad, isVideo) {
    let ratio = (window && window.devicePixelRatio ? window.devicePixelRatio : 1) || 1;
    if (!isString(value)) {
        return value;
    }
    if (value && value.indexOf('file:') >= 0) {
        //value = isWKWebView ? this.utils.cleanupWKWebViewImagePath(value) : value;
        return value;
    }
    ratio = isVideo ? 1 : ratio;
    let protocol = getProtocol();
    if (value && value.replace && protocol) {
        value = value.replace('http:', protocol);
    }
    if (value && value.indexOf && value.indexOf('res.cloudinary') >= 0) {
        let cloudinaryUrl = '';
        if (width) {
            cloudinaryUrl += 'w_' + Math.floor(width * ratio);
            value = value.replace('w_1.0', 'w_' + Math.floor(width * ratio));
        }
        if (height) {
            cloudinaryUrl += ',h_' + Math.floor(height * ratio);
            value = value.replace('h_1.0', 'h_' + Math.floor(height * ratio));
        }
        if (blur) {
            cloudinaryUrl += ',e_blur:' + blur;
        }
        if (opacity) {
            cloudinaryUrl += ',o_' + opacity;
        }
        if (trackFaces) {
            cloudinaryUrl += ',g_faces,z_0.7';
        }
        if (Math.abs(brightness) > 0) {
            cloudinaryUrl += ',e_brightness:' + brightness;
        }
        let isPad = false;
        if (pad) {
            isPad = pad === true;
        }
        if (cloudinaryUrl) {
            cloudinaryUrl += ',';
        }
        if (isVideo) {
            cloudinaryUrl += 'c_pad,vc_auto';
            value = value.substr(0, value.lastIndexOf('.')) + '.mp4';
        }
        else {
            cloudinaryUrl += isPad ? 'c_pad' : 'c_fill';
            cloudinaryUrl += ',q_auto:low,f_auto,fl_lossy';
        }
        let position = value.indexOf('upload/');
        if (position > 0) {
            position += 7;
            value = [value.slice(0, position), cloudinaryUrl + '/', value.slice(position)].join('');
        }
    }
    return value;
}
export function getBackImageStyle(url) {
    url = url.replace('http://', 'https://');
    return {
        'background-repeat': 'no-repeat',
        'background-attachment': 'center',
        'background-size': 'cover',
        'background-position-x': '5;0%',
        'background-image': 'url("' + url + '")'
    };
}
// Config constant functions
export function isCordova() {
    // return typeof window !== 'undefined' && window && window.cordova;
    return false;
}
// TODO: implement business logic
export function isAndroid() {
    return false;
}
// TODO: implement business logic
export function isUniversal() {
    return false;
}
export function getElementDimensions(element) {
    if (element === window) {
        return { height: element.innerHeight, width: element.innerWidth };
    }
    if (element.clientWidth && element.clientHeight) {
        return { height: element.clientHeight, width: element.clientWidth };
    }
    let rect = element.getBoundingClientRect();
    if (rect) {
        return { height: rect.height, width: rect.width };
    }
    return { height: 0, width: 0 };
}
export function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
export function debounce(func, wait = 0) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
    };
}
export function resizeObserve(target, callback) {
    let ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { left, top, width, height } = entry.contentRect;
            callback(entry.target, width, height, left, top, entry);
        }
    });
    ro.observe(target);
    return ro;
}
export function intersectionObserve(target, callback, options) {
    let io = new IntersectionObserver(callback, options);
    io.observe(target);
    return io;
}
