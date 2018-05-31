import anime from 'animejs';

export function setAnimation(animationName: string, targets: HTMLElement | HTMLElement[] | any, options: any = {}): any {
    return anime({ ...animationFactory(animationName, options), targets: targets, ...options });
}

const BACKGROUND_FADE = 'background_fade';
export function backgroundFade(options: { open?: boolean; } = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 150
    };
}

const FADE_IN_AND_SCALE = 'fade_in_scale';
export function fadeInAndScale(options: { open?: boolean; } = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        opacity: [start, end],
        scale: [start, end],
        easing: 'linear',
        duration: 200
    };
}

const FADE = 'fade';
export function fade(options: { open?: boolean; duration?: number, opacityValue?: number; } = {}) {
    let opacityValue = options.opacityValue ? options.opacityValue : 1;
    const start = options.open ? 0 : opacityValue;
    const end = options.open ? opacityValue : 0;
    const duration = options.duration ? options.duration : 200 ;
    return {
        opacity: [start, end],
        easing: 'linear',
        duration: duration
    };
}

const SLIDE_IN_RIGHT = 'slide_right';
export function slideInRight(options: { open?: boolean; } = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        translateX: [(1 * (options.open ? 300 : 0)), (1 * (options.open ? 0 : 300))],
        opacity: [start, end],
        easing: 'linear',
        duration: 200
    };
}

const SLIDE_IN_BOTTOM = 'slide_down';
export function slideInBottom(options: { open?: boolean; } = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        translateY: [(1 * (options.open ? 200 : 0)), (1 * (options.open ? 0 : 200))],
        opacity: [start, end],
        easing: 'linear',
        duration: 200
    };
}

const NEWSPAPER = 'newspaper';
export function newspaper(options: { open?: boolean; } = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        opacity: [start, end],
        rotate: {
            value: (720 * (options.open ? 1 : -1)),
            easing: options.open ? 'easeOutCubic' : 'easeInCubic'
        },
        scale: [start, end],
        easing: options.open ? 'easeOutCubic' : 'easeInCubic',
        duration: 200
    };
}

const FALL = 'fall';
export function fall(options: { open?: boolean; } = {}) {
    const start = options.open ? 0 : 1;
    const end = options.open ? 1 : 0;
    return {
        scale: [options.open ? 1.5 : 1, options.open ? 1 : 1.5],
        opacity: [start, end],
        easing: 'linear',
        duration: 400
    };
}

const SLIDE_FALL = 'slide_fall';
export function slideFall(options: { open?: boolean; } = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        translateX: [options.open ? 300 : 0, options.open ? 0 : 300],
        rotate: [options.open ? 45 : 0, options.open ? 0 : 45],
        easing: 'linear',
        duration: 200
    };
}

const SUPER_SCALED = 'super_scaled';
export function superScaled(options: { open?: boolean; } = {}) {
    return {
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        scale: [options.open ? 4 : 1, options.open ? 1 : 4],
        easing: 'linear',
        duration: 200
    };
}

const BLUR = 'blur';
export function blur(options: { open?: boolean; } = {}) {
    return {
        translateY: [options.open ? -50 : 0, options.open ? 0 : -50],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0]
    };
}

const FLIP_HORIZONTAL_3D = 'flip_3d_horizontal';
export function flip3dHorizontal(options: { open?: boolean; } = {}) {
    return {
        perspective: 1300,
        translateX: [options.open ? 100 : 0, options.open ? 0 : 100],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateY: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 400,
        easing: 'linear'
    };
}

const FLIP_VERTICAL_3D = 'flip_3d_vertical';
export function flip3dVertical(options: { open?: boolean; } = {}) {
    return {
        perspective: 1300,
        translateY: [options.open ? -100 : 0, options.open ? 0 : -100],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateX: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 400,
        easing: 'linear'
    };
}

const SIGN_3D = 'sign_3d';
export function sign3d(options: { open?: boolean; } = {}) {
    return {
        perspective: 1300,
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        rotateX: [options.open ? -90 : 0, options.open ? 0 : -90],
        duration: 200,
        easing: 'linear'
    };
}

const STICKY_UP = 'sticky_up';
export function stickyUp(options: { open?: boolean; distance?: number; modalHeight?: number; } = {}) {
    const startPosition = options.open ? ((options.distance + options.modalHeight) * -1) : (options.distance * -1);
    const endPosition = options.open ? (options.distance * -1) : ((options.distance + options.modalHeight) * -1);
    return {
        translateY: [startPosition, endPosition],
        duration: 200,
        easing: 'linear'
    };
}

const SLIT_3D = 'slit_3d';
export function slit3d(options: { open?: boolean; } = {}) {
    return {
        rotateY: [options.open ? -89 : 0, options.open ? 0 : -89],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        duration: 250,
        delay: options.open ? 50 : 0,
        easing: 'linear'
    };
}

const ROTATE_BOTTOM_3D = 'rotate_bottom_3d';
export function rotateBottom3d(options: { open?: boolean; } = {}) {
    return {
        perspective: 1300,
        rotateX: [options.open ? -70 : 0, options.open ? 0 : -70],
        translateY: [options.open ? 300 : 0, options.open ? 0 : 300],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 200
    };
}

const ROTATE_IN_LEFT_3D = 'rotate_left_3d';
export function rotateInLeft3d(options: { open?: boolean; } = {}) {
    return {
        perspective: 1300,
        rotateY: [options.open ? -70 : 0, options.open ? 0 : -70],
        translateX: [options.open ? -300 : 0, options.open ? 0 : -300],
        scale: [options.open ? 0.8 : 1, options.open ? 1 : 0.8],
        opacity: [options.open ? 0 : 1, options.open ? 1 : 0],
        easing: 'linear',
        duration: 200
    };
}

const WOOBLE = 'wooble';
export function wooble(options: { duration?: number; } = {}) {
    let totalDuration = options.duration || 500;
    return {
        offset: 300,
        translateX: [
            { value: '-15%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '20%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-7%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '5%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-3%', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '0%', duration: totalDuration * 0.15, easing: 'easeInQuad' }
        ],
        rotateZ: [
            { value: '-5deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '3deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-3deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '2deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '-1deg', duration: totalDuration * 0.15, easing: 'easeInQuad' },
            { value: '0', duration: totalDuration * 0.15, easing: 'easeInQuad' }
        ],
        ...options
    };
}

const SHAKE = 'shake';
export function shake(options: { duration?: number; } = {}) {
    let totalDuration = options.duration || 500;
    return {
        offset: 300,
        translateX: [
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '-10px', duration: totalDuration * 0.1, easing: 'easeInQuad' },
            { value: '0', duration: totalDuration * 0.1, easing: 'easeInQuad' }
        ],
        ...options
    };
}

const FAB = 'fab';
export function fab(options: { distance?: number; direction?: string; open?: boolean; } = {}) {
    const startingPosition = options.open ? options.distance : 0;
    const finishingPosition = options.open ? 0 : options.distance;
    switch (options.direction) {
        case 'top':
            return {
                translateY: [startingPosition, finishingPosition],
                easing: 'linear',
                duration: 100,
                ...options
            };
        case 'bottom':
            return {
                translateY: [(startingPosition * -1), (finishingPosition * -1)],
                easing: 'linear',
                duration: 100,
                ...options
            };
        case 'left':
            return {
                translateX: [startingPosition, finishingPosition],
                easing: 'linear',
                duration: 100,
                ...options
            };
        case 'right':
            return {
                translateX: [(startingPosition * -1), (finishingPosition * -1)],
                easing: 'linear',
                duration: 100,
                ...options
            };
        default:
            return {};
    }
}

const SLIDE_IN_STAGGERED = 'slide_id_staggered';
export function slideInStaggered(options: { duration?: number; } = {}) {
    return {
        translateX: [- 300, 0],
        opacity: [0, 1],
        delay: (el, i) => { if (el) { return i * 100; } return 0; },
        ...options
    };
}

const SLIDE_VERTICAL = 'slide_vertical';
export function slideVertical(options: { up?: boolean; distance?: number; duration?: number; open?: boolean; } = {}) {
    let duration = options.duration ? options.duration : 100;
    let distance = options.distance ? options.distance : 100;
    return {
        translateY: [options.open ? ((options.up ? 1 : -1) * (distance)) : 0, options.open ? 0 : ((options.up ? 1 : -1) * (distance))],
        easing: 'linear',
        duration: duration
    };
}

const SLIDE_HORIZONTAL = 'slide_horizontal';
export function slideHorizontal(options: { open?: boolean; distance?: number; start?: number, duration?: number} = {}) {
    let start = options.start || 0;
    let duration = options.duration || 100;
    return {
        translateX: [(options.open ?  start : options.distance) , (options.open ? options.distance : start)],
        easing: 'linear',
        duration
    };
}

const TRANSITION_SCALE = 'transition_scale';
export function transitionScale(options: { open?: boolean; } = {}) {
    return {
        scale: [options.open ? 1 : 1.1, options.open ? 1.1 : 1],
        easing: 'linear',
        duration: 200
    };
}

export const animations = {
    backgroundFade: BACKGROUND_FADE,
    wooble: WOOBLE,
    shake: SHAKE,
    slideInStaggered: SLIDE_IN_STAGGERED,
    rotateInLeft3d: ROTATE_IN_LEFT_3D,
    rotateBottom3d: ROTATE_BOTTOM_3D,
    slit3d: SLIT_3D,
    stickyUp: STICKY_UP,
    sign3d: SIGN_3D,
    flip3dVertical: FLIP_VERTICAL_3D,
    flip3dHorizontal: FLIP_HORIZONTAL_3D,
    blur: BLUR,
    superScaled: SUPER_SCALED,
    slideFall: SLIDE_FALL,
    fall: FALL,
    newspaper: NEWSPAPER,
    slideInBottom: SLIDE_IN_BOTTOM,
    slideInRight: SLIDE_IN_RIGHT,
    fadeInAndScale: FADE_IN_AND_SCALE,
    fade: FADE,
    fab: FAB,
    slideVertical: SLIDE_VERTICAL,
    slideHorizontal: SLIDE_HORIZONTAL,
    transitionScale: TRANSITION_SCALE
};

export function animationFactory(animationName: string, options: any = {}): any {
    switch (animationName) {
        case BACKGROUND_FADE:
            return backgroundFade(options);
        case FADE:
            return fade(options);
        case FADE_IN_AND_SCALE:
            return fadeInAndScale(options);
        case SLIDE_IN_RIGHT:
            return slideInRight(options);
        case SLIDE_IN_BOTTOM:
            return slideInBottom(options);
        case NEWSPAPER:
            return newspaper(options);
        case FALL:
            return fall(options);
        case SLIDE_FALL:
            return slideFall(options);
        case STICKY_UP:
            return stickyUp(options);
        case FLIP_HORIZONTAL_3D:
            return flip3dHorizontal(options);
        case FLIP_VERTICAL_3D:
            return flip3dVertical(options);
        case SIGN_3D:
            return sign3d(options);
        case SUPER_SCALED:
            return superScaled(options);
        case SLIT_3D:
            return slit3d(options);
        case ROTATE_BOTTOM_3D:
            return rotateBottom3d(options);
        case ROTATE_IN_LEFT_3D:
            return rotateInLeft3d(options);
        case BLUR:
            return blur(options);
        case FAB:
            return fab(options);
        case WOOBLE:
            return wooble(options);
        case SHAKE:
            return shake(options);
        case SLIDE_IN_STAGGERED:
            return slideInStaggered(options);
        case SLIDE_VERTICAL:
            return slideVertical(options);
        case SLIDE_HORIZONTAL:
            return slideHorizontal(options);
        case TRANSITION_SCALE:
            return transitionScale(options);
        default:
            return {};
    }
}