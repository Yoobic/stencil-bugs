import { EventEmitter } from '@stencil/core';

import postscribe from 'postscribe';
import { isString } from 'lodash-es';

import ResizeObserver from 'resize-observer-polyfill';
import 'intersection-observer';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays';

export function loadScript(url?: string) {
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

export function cloudinary(value: string, width?: number, height?: number, blur?: number, opacity?: number, trackFaces?: boolean, brightness?: number, pad?: boolean, isVideo?: boolean) {
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
        } else {
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

export function getBackImageStyle(url: string) {
    if (url) {
        url = url.replace('http://', 'https://');
        return {
            'background-repeat': 'no-repeat',
            'background-attachment': 'center',
            'background-size': 'cover',
            'background-position-x': '5;0%',
            'background-image': 'url("' + url + '")'
        };
    }
    return {};
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

export function getElementDimensions(element: any) {
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

export function debounceEvent(event: EventEmitter, wait: number): EventEmitter {
    const original = (event as any)._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    } as EventEmitter;
}

export function debounce(func: Function, wait = 500, immediate = false)  {
    let timeout;
    return function (...args) {
        let context = this;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

export function resizeObserve(target: Element, callback: Function) {
    let ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { left, top, width, height } = entry.contentRect;
            callback(entry.target, width, height, left, top, entry);
        }
    });
    ro.observe(target);
    return ro;
}

export function intersectionObserve(target: Element, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    let io = new IntersectionObserver(callback, options);
    io.observe(target);
    return io;
}

export function resizeWindow(fn: Function) {
    window.addEventListener('resize', debounce(fn, 500));
}

export function execHandlerAndStopEvent(event: CustomEvent | MouseEvent, handler: () => void) {
    event.stopPropagation();
    if (handler) {
        handler();
    }
}

export function isBlank(obj) {
    return obj === undefined || obj === null;
}

export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}

export function getSizeModal(host: HTMLStencilElement, maxHeight: number) {
    let body = host.closest('.modal-body');
    if (body) {
        maxHeight = Math.min(maxHeight, body.clientHeight);
    } else {
        maxHeight = decreaseMaxHeight(maxHeight, 'ion-header', document);
        maxHeight = decreaseMaxHeight(maxHeight, 'ion-footer', document);
    }
    return maxHeight;
}

export function decreaseMaxHeight(maxHeight: number, name: string, html): number {
    let comp: HTMLElement = html.querySelector(name);
    if (comp) {
        maxHeight -= comp.clientHeight;
    }
    return maxHeight;
}

export function pixelToRem(pixels: number) {
    return pixels / 16;
}

// export async function showModal(component: string | Function | HTMLElement, options?: any, closeComponent: string = 'ion-button.close', closeEvent: string = 'click') {
//     // initialize controller
//     const modalController = document.querySelector('ion-modal-controller');
//     await modalController.componentOnReady();

//     // // create component to open
//     // const element = document.createElement('div');
//     // element.innerHTML = component;

//     // // listen for close event
//     // const button = element.querySelector(closeComponent);
//     // button.addEventListener(closeEvent, () => {
//     //     modalController.dismiss();
//     // });

//     // present the modal
//     const modalElement = await modalController.create({
//         component: component,
//         componentProps: options
//     });
//     modalElement.present();
// }

export async function showModal(component: string | Function | HTMLElement, options?: any, cssClass?: string): Promise<OverlayEventDetail> {
    return new Promise((resolve, reject) => {
        // initialize controller
        const modalController = document.querySelector('ion-modal-controller');
        modalController.componentOnReady().then(() => {
            modalController.create({
                component: component,
                componentProps: options,
                cssClass: cssClass
            }).then(modal => {
                modal.onDidDismiss((ret) => {
                    resolve(ret);
                });
                modal.present();
            });
        });
    });
}

export function getNextValueInArray<A>(array: Array<A>, value: A) {
    if (array && array.length > 1) {
        let currentIndex: number = array.indexOf(value);
        if (currentIndex >= 0) {
            if (currentIndex === array.length - 1) {
                return array[0];
            } else {
                return array[currentIndex + 1];
            }
        }
    }
}