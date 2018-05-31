const _window = window;
export function getNavigator() {
    return window.navigator;
}
export function getUserAgent() {
    return getNavigator().userAgent;
}
export function isCordova() {
    return typeof _window !== 'undefined' && _window && _window.cordova;
}
export function isElectron() {
    return typeof _window !== 'undefined' && _window.process && _window.process.type === 'renderer';
}
export function isFirefox() {
    return typeof _window !== 'undefined' && _window && getNavigator() && getUserAgent() && getUserAgent().search('Firefox') >= 0;
}
export function isIE() {
    return typeof _window !== 'undefined' && _window && getNavigator() && getUserAgent() && (getUserAgent().search('MSIE ') >= 0 || getUserAgent().search('Edge') >= 0);
}
export function isIE11() {
    return !!_window.MSInputMethodContext && !!document.documentMode;
}
export function isLandscape() {
    return !this.isPortrait();
}
export function isPortrait() {
    return _window.matchMedia('(orientation: portrait)').matches;
}
export function isIonic() {
    // TODO
    return null;
}
export function isUniversal() {
    // TODO
    return null;
}
export function isIOS() {
    // TODO
    return null;
}
export function isIOS9() {
    // TODO
    return null;
}
export function isIphoneX() {
    // TODO
    return null;
}
export function isAndroid() {
    // TODO
    return null;
}
export function isWKWebView() {
    // TODO
    return null;
}
export function isTablet() {
    // TODO
    return null;
}
export function isSamsung() {
    // TODO
    return null;
}
export function isSurface() {
    return (_window && getNavigator() && getNavigator().platform && getNavigator().platform.toLowerCase().startsWith('win') && getNavigator().maxTouchPoints > 1);
}
