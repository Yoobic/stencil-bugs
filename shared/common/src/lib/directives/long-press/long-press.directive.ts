import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';

//import { Gesture } from 'ionic-angular';

@Directive({
    selector: '[long-press]'
})
export class LongPressDirective implements OnInit, OnDestroy {

    @Input() duration: number = 500;

    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

    private el: HTMLElement;
    private longPressing: boolean = false;
    private pressing: boolean = false;
    private timeout: any;
    private mouseX: number = 0;
    private mouseY: number = 0;

    @HostBinding('class.press')
    get press() {
        return this.pressing;
    }

    @HostBinding('class.longpress')
    get longPress() {
        return this.longPressing;
    }

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        this.el.onmousedown = event => {
            if (event.which !== 1) {
                return;
            }

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            this.pressing = true;
            this.longPressing = false;

            this.timeout = setTimeout(() => {
                if (this.pressing) {
                    this.longPressing = true;
                    this.onLongPress.emit(event);
                    this.loop(event);
                }
            }, this.duration);

            this.loop(event);
        };

        this.el.onmousemove = event => {
            if (this.pressing && !this.longPressing) {
                const xThres = (event.clientX - this.mouseX) > 10;
                const yThres = (event.clientY - this.mouseY) > 10;
                if (xThres || yThres) {
                    this.endPress();
                }
            }
        };

        this.el.onmouseup = event => {
            this.endPress();
        };
    }

    ngOnDestroy() {
    }

    loop(event) {
        if (this.longPressing) {
            this.timeout = setTimeout(() => {
                this.onLongPressing.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress() {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    }

}
