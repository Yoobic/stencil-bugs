
const _window = window as any;

export function getNavigator(): Navigator {
    return window.navigator;
}

export function getUserAgent(): string {
    return getNavigator().userAgent;
}

export function isCordova(): boolean {
    return typeof _window !== 'undefined' && _window && _window.cordova;
}

export function isElectron(): boolean {
    return typeof _window !== 'undefined' && _window.process && _window.process.type === 'renderer';
}

export function isFirefox(): boolean {
    return typeof _window !== 'undefined' && _window && getNavigator() && getUserAgent() && getUserAgent().search('Firefox') >= 0;
}

export function isIE(): boolean {
    return typeof _window !== 'undefined' && _window && getNavigator() && getUserAgent() && (getUserAgent().search('MSIE ') >= 0 || getUserAgent().search('Edge') >= 0);
}

export function isIE11(): boolean {
    return !!(<any>_window).MSInputMethodContext && !!(<any>document).documentMode;
}

export function isLandscape(): boolean {
    return !this.isPortrait();
}

export function isPortrait(): boolean {
    return _window.matchMedia('(orientation: portrait)').matches;
}

export function isIonic(): boolean {
    // TODO
    return null;
}

export function isUniversal(): boolean {
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