export declare function loadScript(url?: string): Promise<string>;
export declare function getProtocol(): string;
export declare function cloudinary(): string;
export declare function resizeObserve(target: Element, callback: Function): {};
export declare function intersectionObserve(target: Element, callback: any, options?: any): {
    observe: () => boolean;
};
export declare function getBackImageStyle(url: string): {
    'background-repeat': string;
    'background-attachment': string;
    'background-size': string;
    'background-position-x': string;
    'background-image': string;
};
