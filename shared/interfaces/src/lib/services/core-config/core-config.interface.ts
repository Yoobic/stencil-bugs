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