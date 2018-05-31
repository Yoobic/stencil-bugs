export declare function setAnimation(animationName: string, targets: HTMLElement | HTMLElement[] | any, options?: any): any;
export declare function backgroundFade(options?: {
    open?: boolean;
}): {
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function fadeInAndScale(options?: {
    open?: boolean;
}): {
    opacity: number[];
    scale: number[];
    easing: string;
    duration: number;
};
export declare function fade(options?: {
    open?: boolean;
    duration?: number;
    opacityValue?: number;
}): {
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function slideInRight(options?: {
    open?: boolean;
}): {
    translateX: number[];
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function slideInBottom(options?: {
    open?: boolean;
}): {
    translateY: number[];
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function newspaper(options?: {
    open?: boolean;
}): {
    opacity: number[];
    rotate: {
        value: number;
        easing: string;
    };
    scale: number[];
    easing: string;
    duration: number;
};
export declare function fall(options?: {
    open?: boolean;
}): {
    scale: number[];
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function slideFall(options?: {
    open?: boolean;
}): {
    opacity: number[];
    translateX: number[];
    rotate: number[];
    easing: string;
    duration: number;
};
export declare function superScaled(options?: {
    open?: boolean;
}): {
    opacity: number[];
    scale: number[];
    easing: string;
    duration: number;
};
export declare function blur(options?: {
    open?: boolean;
}): {
    translateY: number[];
    opacity: number[];
};
export declare function flip3dHorizontal(options?: {
    open?: boolean;
}): {
    perspective: number;
    translateX: number[];
    opacity: number[];
    rotateY: number[];
    duration: number;
    easing: string;
};
export declare function flip3dVertical(options?: {
    open?: boolean;
}): {
    perspective: number;
    translateY: number[];
    opacity: number[];
    rotateX: number[];
    duration: number;
    easing: string;
};
export declare function sign3d(options?: {
    open?: boolean;
}): {
    perspective: number;
    opacity: number[];
    rotateX: number[];
    duration: number;
    easing: string;
};
export declare function stickyUp(options?: {
    open?: boolean;
    distance?: number;
    modalHeight?: number;
}): {
    translateY: number[];
    duration: number;
    easing: string;
};
export declare function slit3d(options?: {
    open?: boolean;
}): {
    rotateY: number[];
    scale: number[];
    duration: number;
    delay: number;
    easing: string;
};
export declare function rotateBottom3d(options?: {
    open?: boolean;
}): {
    perspective: number;
    rotateX: number[];
    translateY: number[];
    scale: number[];
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function rotateInLeft3d(options?: {
    open?: boolean;
}): {
    perspective: number;
    rotateY: number[];
    translateX: number[];
    scale: number[];
    opacity: number[];
    easing: string;
    duration: number;
};
export declare function wooble(options?: {
    duration?: number;
}): {
    duration?: number;
    offset: number;
    translateX: {
        value: string;
        duration: number;
        easing: string;
    }[];
    rotateZ: {
        value: string;
        duration: number;
        easing: string;
    }[];
};
export declare function shake(options?: {
    duration?: number;
}): {
    duration?: number;
    offset: number;
    translateX: {
        value: string;
        duration: number;
        easing: string;
    }[];
};
export declare function fab(options?: {
    distance?: number;
    direction?: string;
    open?: boolean;
}): {};
export declare function slideInStaggered(options?: {
    duration?: number;
}): {
    duration?: number;
    translateX: number[];
    opacity: number[];
    delay: (el: any, i: any) => number;
};
export declare function slideVertical(options?: {
    up?: boolean;
    distance?: number;
    duration?: number;
    open?: boolean;
}): {
    translateY: number[];
    easing: string;
    duration: number;
};
export declare function slideHorizontal(options?: {
    open?: boolean;
    distance?: number;
}): {
    translateX: number[];
    easing: string;
    duration: number;
};
export declare function transitionScale(options?: {
    open?: boolean;
}): {
    scale: number[];
    easing: string;
    duration: number;
};
export declare const animations: {
    backgroundFade: string;
    wooble: string;
    shake: string;
    slideInStaggered: string;
    rotateInLeft3d: string;
    rotateBottom3d: string;
    slit3d: string;
    stickyUp: string;
    sign3d: string;
    flip3dVertical: string;
    flip3dHorizontal: string;
    blur: string;
    superScaled: string;
    slideFall: string;
    fall: string;
    newspaper: string;
    slideInBottom: string;
    slideInRight: string;
    fadeInAndScale: string;
    fade: string;
    fab: string;
    slideVertical: string;
    slideHorizontal: string;
    transitionScale: string;
};
export declare function animationFactory(animationName: string, options?: any): any;
