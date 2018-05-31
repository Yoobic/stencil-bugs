import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { isPresent } from '@shared/common';

export enum LoadingBarEventType { PROGRESS, VISIBLE }

export class LoadingBarEvent {
    constructor(public type: LoadingBarEventType, public value: any) { }
}

@Injectable()
export class LoadingBar {
    public interval: number = 500; // in milliseconds
    public observable: Observable<LoadingBarEvent>;

    private _progress: number = 0;
    private _visible: boolean = true;
    private _intervalCounterId: any = 0;
    private subscriber: Subscriber<LoadingBarEvent>;

    constructor() {
        this.observable = new Observable<LoadingBarEvent>((subscriber: Subscriber<LoadingBarEvent>) => {
            this.subscriber = subscriber;
        });
    }

    set progress(value: number) {
        if (isPresent(value)) {
            if (value > 0) {
                this.visible = true;
            }
            this._progress = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
        }
    }

    get progress(): number {
        return this._progress;
    }

    set visible(value: boolean) {
        if (isPresent(value)) {
            this._visible = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    start(onCompleted: Function = null) {
        this.stop();
        this.visible = true;
        this._intervalCounterId = setInterval(() => {
            this.progress++;
            if (this.progress === 100) {
                this.complete();
            }
        }, this.interval);
    }

    stop() {
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
    }

    reset() {
        this.stop();
        this.progress = 0;
    }

    complete() {
        this.progress = 100;
        this.stop();
        setTimeout(() => {
            this.visible = false;
            setTimeout(() => {
                this.progress = 0;
            }, 250);
        }, 250);
    }

    private emitEvent(event: LoadingBarEvent) {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    }
}
