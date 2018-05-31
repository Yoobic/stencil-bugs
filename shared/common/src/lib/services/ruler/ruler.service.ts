import { Injectable, ElementRef } from '@angular/core';

export class Rectangle {
    left;
    right;
    top;
    bottom;
    height;
    width;
    constructor(left, top, width, height) {
        this.left = left;
        this.right = left + width;
        this.top = top;
        this.bottom = top + height;
        this.height = height;
        this.width = width;
    }
}

@Injectable()
export class Ruler {

    measureSync(el: ElementRef) {
        if (el && el.nativeElement) {
            let clientRect = (<any>el.nativeElement).getBoundingClientRect();
            return new Rectangle(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
        }
        return new Rectangle(0, 0, 0, 0);
    }

    measure(el: ElementRef): Promise<Rectangle> {
        // even if getBoundingClientRect is synchronous we use async API in preparation for further changes
        return new Promise((resolve, reject) => {
            resolve(this.measureSync(el));
        });
    }
}
