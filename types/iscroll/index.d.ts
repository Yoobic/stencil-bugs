// Type definitions for iScroll 4.2
// Project: http://cubiq.org/iscroll-4
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Christiaan Rakowski <https://github.com/csrakowski/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace IScroll { }

interface iScrollEvent {
    (e: Event): void;
}

interface iScrollOptions {
    hScroll?: boolean;
    vScroll?: boolean;
    x?: number;
    y?: number;
    bounce?: boolean;
    bounceLock?: boolean;
    momentum?: boolean;
    lockDirection?: boolean;
    useTransform?: boolean;
    useTransition?: boolean;
    topOffset?: number;
    checkDOMChanges?: boolean;
    handleClick?: boolean;

    // Scrollbar
    hScrollbar?: boolean;
    vScrollbar?: boolean;
    fixedScrollbar?: boolean;
    hideScrollbar?: boolean;
    fadeScrollbar?: boolean;
    scrollbarClass?: string;
    scrollbars?: any;
    mouseWheel?: boolean;
    disableMouse?: boolean;
    disablePointer?: boolean;
    interactiveScrollbars?: boolean;
    shrinkScrollbars?: any;
    fadeScrollbars?: boolean;

    // Zoom
    zoom?: boolean;
    zoomMin?: number;
    zoomMax?: number;
    doubleTapZoom?: number;
    wheelAction?: string;

    // Snap
    snap?: any;
    snapThreshold?: number;

    // Events
    onRefresh?: iScrollEvent;
    onBeforeScrollStart?: iScrollEvent;
    onScrollStart?: iScrollEvent;
    onBeforeScrollMove?: iScrollEvent;
    onScrollMove?: iScrollEvent;
    onBeforeScrollEnd?: iScrollEvent;
    onScrollEnd?: iScrollEvent;
    onTouchEnd?: iScrollEvent;
    onDestroy?: iScrollEvent;
    onZoomStart?: iScrollEvent;
    onZoom?: iScrollEvent;
    onZoomEnd?: iScrollEvent;

    preventDefault?: boolean;
}

declare class IScroll {

    constructor(element: string, options?: iScrollOptions);
    constructor(element: HTMLElement, options?: iScrollOptions);
    static utils: any;

    maxScrollY: number;
    wrapperHeight: number;

    destroy(): void;
    refresh(): void;
    scrollBy(x: number, y: number, time?: number, easing?: any): void;
    scrollTo(x: number, y: number, time?: number, relative?: boolean): void;
    scrollToElement(element: string, time?: number, offsetX?: string | boolean, offsetY?: string | boolean, easing?: any): void;
    scrollToElement(element: HTMLElement, time?: number, offsetX?: string | boolean, offsetY?: string | boolean, easing?: any): void;
    scrollToPage(pageX: number, pageY: number, time?: number): void;
    disable(): void;
    enable(): void;
    stop(): void;
    zoom(x: number, y: number, scale: number, time?: number): void;
    isReady(): boolean;

    _wheel: Function;
    on(event: string, listener: Function): void;

    disable(): void;
    enable(): void;
}

declare module 'iscroll' {
    export = IScroll;
}
