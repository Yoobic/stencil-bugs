import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export interface ICoreConfig {
    setNativePlatform(platform);
    setDevice(device);
    isWeb(): boolean;
    isIonic(): boolean;
    isCordova(): boolean;
    isElectron(): boolean;
    isFirefox(): boolean;
    isIE(): boolean;
    isIE11(): boolean;
    isUniversal(): boolean;
    getPlatform(): string;
    isIOS(): boolean;
    isIOS9(): boolean;
    isIphoneX(): boolean;
    isAndroid(): boolean;
    isWKWebView(): boolean;
    isTablet(): boolean;
    isSamsung(): boolean;
    isSurface(): boolean;
    reload(): void;
    isFullScreenEnabled(): boolean;
    isFullScreen(): boolean;
    requestFullScreen(): void;
    exitFullScreen(): void;
    getProtocol(): string;
}

@Injectable()
export class CoreConfig implements ICoreConfig {

    private nativePlatform: any;
    private device: any;
    private _isSamsung: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId) {
    }

    public setNativePlatform(platform) {
        this.nativePlatform = platform;
    }

    public setDevice(device) {
        this.device = device;
        if (this.device) {
            let modelRegex = new RegExp('SM-');
            this._isSamsung = modelRegex.test(this.device.model) ? true : false;
        }
    }

    // convenient platform checks
    public isWeb(): boolean {
        return false;
    }

    public isIonic(): boolean {
        return true;
    }

    public isCordova(): boolean {
        return !!(typeof window !== 'undefined' && window && (<any>window).cordova);
    }

    public isElectron(): boolean {
        return typeof window !== 'undefined' && (<any>window).process && (<any>window).process.type === 'renderer';
    }

    public isFirefox(): boolean {
        return typeof window !== 'undefined' && window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.search('Firefox') >= 0;
    }

    public isIE(): boolean {
        return typeof window !== 'undefined' && window && window.navigator && window.navigator.userAgent && (window.navigator.userAgent.search('MSIE ') >= 0 || window.navigator.userAgent.search('Edge') >= 0);
    }

    public isIE11(): boolean {
        return !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
    }

    public isUniversal(): boolean {
        return isPlatformServer(this.platformId);
    }

    public getPlatform(): string {
        return null;
    }

    public isIOS() {
        return this._ionicPlatformIs('ios');
    }

    public isIOS9() {
        if (this.nativePlatform && this.isIonic() && this.isIOS() && this.isCordova()) {
            let version = this.nativePlatform.version();
            return version.major <= 9;
        } else if (/iP(hone|od|ad)/.test(navigator.platform)) {
            let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            let major = parseInt(v[1], 10);
            return major <= 9;
        }
        return false;
    }

    public isIphoneX() {
        // iPhone 8 and iPhone X have a same user agent. We cannot avoid using window.screen.
        // This works well both in iOS Safari and (UI|WK)WebView of iPhone X.
        //return this.isIPhone() && window.screen.width === 375 && window.screen.height === 812;
        return this.isCordova() && this.device && this.device.model && (this.device.model.startsWith('iPhone10,3') || this.device.model.startsWith('iPhone10,6'));
    }

    public isAndroid() {
        return this._ionicPlatformIs('android');
    }

    public isWKWebView() {
        return this.isIOS() && (<any>window).webkit;
    }

    public isTablet() {
        if (this.nativePlatform && this.isIonic()) {
            return this.nativePlatform.is('tablet') || this.nativePlatform.is('ipad');
        }
        return false;
    }

    public isSamsung() {
        return this._isSamsung;
    }

    public isSurface() {
        return (window && window.navigator && window.navigator.platform && window.navigator.platform.toLowerCase().startsWith('win') && window.navigator.maxTouchPoints > 1);
    }

    public reload() {
        if (this.isElectron()) {

        } else if (location && location.reload) {
            location.reload();
        }
    }

    public isFullScreenEnabled() {
        if (this.isUniversal()) {
            return false;
        }
        return (
            (<any>document).fullscreenEnabled ||
            (<any>document).webkitFullscreenEnabled ||
            (<any>document).mozFullScreenEnabled ||
            (<any>document).msFullscreenEnabled
        );
    }

    public isFullScreen() {
        if (this.isUniversal()) {
            return false;
        }
        if (
            (<any>document).fullscreenElement ||
            (<any>document).webkitFullscreenElement ||
            (<any>document).mozFullScreenElement ||
            (<any>document).msFullscreenElement
        ) {
            return true;
        }
        return false;
    }

    public requestFullScreen() {
        if (this.isUniversal()) {
            return;
        }
        if (document && document.body) {
            let i: any = document.body;
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        }
    }

    public exitFullScreen() {
        if (this.isUniversal()) {
            return;
        }
        if (document) {
            if ((<any>document).exitFullscreen) {
                (<any>document).exitFullscreen();
            } else if ((<any>document).webkitExitFullscreen) {
                (<any>document).webkitExitFullscreen();
            } else if ((<any>document).mozCancelFullScreen) {
                (<any>document).mozCancelFullScreen();
            } else if ((<any>document).msExitFullscreen) {
                (<any>document).msExitFullscreen();
            }
        }
    }

    public getProtocol() {
        let protocol = this.isCordova() || this.isElectron() || this.isUniversal() ? 'https:' : window.location.protocol;
        return protocol;
    }

    private _ionicPlatformIs(platform: string) {
        if (this.isIonic() && this.nativePlatform) {
            return this.nativePlatform.is(platform);
        }
        return false;
    }

}
