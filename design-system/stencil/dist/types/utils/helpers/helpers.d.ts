import { EventEmitter } from '@stencil/core';
import 'intersection-observer';
export declare function loadScript(url?: string): Promise<{}>;
export declare function getProtocol(): string;
export declare function cloudinary(value: string, width?: number, height?: number, blur?: number, opacity?: number, trackFaces?: boolean, brightness?: number, pad?: boolean, isVideo?: boolean): string;
export declare function getBackImageStyle(url: string): {
    'background-repeat': string;
    'background-attachment': string;
    'background-size': string;
    'background-position-x': string;
    'background-image': string;
};
export declare function isCordova(): boolean;
export declare function isAndroid(): boolean;
export declare function isUniversal(): boolean;
export declare function getElementDimensions(element: any): {
    height: any;
    width: any;
};
export declare function debounceEvent(event: EventEmitter, wait: number): EventEmitter;
export declare function debounce(func: Function, wait?: number): (...args: any[]) => void;
export declare function resizeObserve(target: Element, callback: Function): ResizeObserver;
export declare function intersectionObserve(target: Element, callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
