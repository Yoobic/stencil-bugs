export function setAnimation() {
    return {finished: Promise.resolve(true)};
}

// PROPER way to fix this, jest not mock the entire file ???
export const animations = {
    wooble: 'wooble',
    shake: 'shake',
    slideInStaggered: 'slide_in_staggered',
    rotateInLeft3d: '',
    rotateBottom3d: '',
    slit3d: '',
    justMe: '',
    stickyUp: '',
    sign3d: '',
    flipVertical3d: '',
    flipHorizontal3d: '',
    blur: '',
    superScaled: '',
    slideFall: '',
    fall: '',
    newspaper: '',
    slideInBottom: '',
    slideInRight: '',
    fadeInScale: ''
};
