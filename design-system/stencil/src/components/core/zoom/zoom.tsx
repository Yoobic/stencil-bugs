import { Component, Element } from '@stencil/core';
import { getElementDimensions } from '../../../utils/helpers';


import * as hammer from 'hammerjs';
const Hammer = (hammer as any).default;

@Component({
    tag: 'yoo-zoom',
    styleUrl: 'zoom.scss',
    scoped: true
})
export class YooZoomComponent {

     @Element() host: HTMLStencilElement;

    public adjustScale = 1;
    public adjustDeltaX = 0;
    public adjustDeltaY = 0;

    private parentContainer: HTMLElement;
    private currentScale: number = 1;
    private currentDeltaX: number = 0;
    private currentDeltaY: number = 0;
    private lockPan: boolean;
    private transforms = [];
    private containerHeight = null;
    private containerWidth = null;
    private hammerCtrl: hammer.Hammer;

    componentDidLoad() {
        this.parentContainer = this.host.querySelector('div.zoom-container');
        // This was breaking the touch detection on the photo-editor - need to come back to this later
        // this.parentContainer.addEventListener('touchstart', (event) => {
        //     event.preventDefault();
        // });

        const { height, width } = getElementDimensions(this.parentContainer);

        this.containerHeight = height;
        this.containerWidth = width;

        this.hammerCtrl = new Hammer(this.parentContainer);
        this.addGestureRecognizers();
        this.initGestures();

    }

    initGestures() {
        this.hammerCtrl.on('doubletap', (event) => {
            this.handleDoubleTap(event);
        });

        this.hammerCtrl.on('pan', (event) => {
            if (!this.lockPan) {
                this.setTransform(event);
            }
        });

        this.hammerCtrl.on('pinch', (event) => {
            this.lockPan = false;
            this.setTransform(event);
        });

        this.hammerCtrl.on('pinchend', (event) => {
            this.saveTransform();
        });

        this.hammerCtrl.on('panend', (event) => {
            this.saveTransform();
        });
    }

    addGestureRecognizers() {
        let singleTap = new Hammer.Tap({event: 'singletap'});
        let doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2});

        this.hammerCtrl.add([doubleTap, singleTap]);
        this.hammerCtrl.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL}));
        this.hammerCtrl.get('pinch').set({enable: true});

        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
    }

    handleDoubleTap(event) {
        this.transforms = [];
        this.adjustScale += 1;
        if (this.adjustScale > 4) {
            this.adjustScale = 1;
        }
        this.lockPan = false;
        this.transforms.push('scale(' + this.adjustScale + ')');
        this.parentContainer.style.transform = this.transforms.join(' ');
    }

    setTransform(event: any) {
        this.transforms = [];
        this.currentScale = this.adjustScale * event.scale;
        this.currentDeltaX = this.adjustDeltaX + (event.deltaX / this.currentScale);
        this.currentDeltaY = this.adjustDeltaY + (event.deltaY / this.currentScale);

        // Revert to original scale if < 1
        if (this.currentScale < 1) {
            this.currentScale = 1;
            this.currentDeltaX = 0;
            this.currentDeltaY = 0;
        }

        // Create the drag boundary
        let dragWidthLimit = this.containerWidth * (this.currentScale - 1) / this.currentScale / 2;
        let dragHeightLimit = this.containerHeight * (this.currentScale - 1) / this.currentScale / 2;

        if (this.currentDeltaX > dragWidthLimit) {
            this.currentDeltaX = dragWidthLimit;
        } else if (this.currentDeltaX < -dragWidthLimit) {
            this.currentDeltaX = -dragWidthLimit;
        }

        if (this.currentDeltaY > dragHeightLimit) {
            this.currentDeltaY = dragHeightLimit;
        } else if (this.currentDeltaY < -dragHeightLimit) {
            this.currentDeltaY = -dragHeightLimit;
        }

        this.transforms.push('scale(' + this.currentScale + ')');
        this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
        this.parentContainer.style.transform = this.transforms.join(' ');
    }

    saveTransform() {
        // Saving the final transforms for adjustment next time the user interacts.
        this.adjustScale = this.currentScale;
        this.adjustDeltaX = this.currentDeltaX;
        this.adjustDeltaY = this.currentDeltaY;
    }

    render(): JSX.Element {
        return (
            <div class="zoom-container" attr-layout="column">
                <div class="zoom-container-child">
                    <slot/>
                </div>
            </div>
        );
    }
}
