import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Resize {
    public resized = new EventEmitter<any>();

    constructor() { }

    public emit(timeout = 0) {
        setTimeout(() => {
            this.resized.emit(true);
        }, timeout);
    }

    public emitWindow(timeout = 0) {
        setTimeout(() => window.dispatchEvent(new CustomEvent('resize')), timeout);
    }
}
