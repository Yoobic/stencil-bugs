interface System {
    import(request: string): Promise<any>;
}

interface Window {
    Zone: any;
    zone: any;
    JSON: any;
    RegExp: any;
    Map: any;
    Set: any;
    Reflect: any;
    Promise: any;
    Math: any;
    EventTarget: any;
    requireCache: any;
    clearWebpackCache: any;
    //fusejs: FuseJS;
    Storage: Function;
    sessionStorage: any;
    IonicNative: any;
    // resolveLocalFileSystemURL?: any;
    // requestFileSystem?: any;
    LocalFileSystem?: any;
    OneSignal?: any;
    process?: any;
    Stripe?: any;
    AMap?: any;
    analytics?: any;
    Branch?: Branch;
    Intercom?: any;
    import(request: string): Promise<any>;
    Ionic?: any;
    translateService?: any;
    coreConfigService?: any;
}

interface Branch {
    debugMode?: boolean;
    disableGlobalListenersWarnings(): void;
    initSession(deepLinkDataListener: (deeplinkData: any) => void): Promise<any>;
    setRequestMetadata(key: string, val: string): Promise<any>;
    setDebug(isEnabled?: boolean): Promise<any>;
    setCookieBasedMatching(linkDomain?: any): Promise<any>;
    getFirstReferringParams(): Promise<any>;
    getLatestReferringParams(): Promise<any>;
    setIdentity(identity?: any): Promise<any>;
    logout(): Promise<any>;
    userCompletedAction(action: string, metaData?: any): Promise<any>;
    sendCommerceEvent(action: string, metaData?: any): Promise<any>;
    createBranchUniversalObject(options: any): Promise<BranchUniversalObject>;
    loadRewards(bucket?: string): Promise<any>;
    redeemRewards(value?: string, bucket?: string): Promise<any>;
    creditHistory(): Promise<any>;
}

interface BranchUniversalObject {
    message?: string;
    instanceId?: string;
    registerView(): Promise<any>;
    generateShortUrl(options: any, controlParameters: any): Promise<any>;
    showShareSheet(options: any, controlParameters: any, shareText?: string): Promise<any>;
    onShareSheetLaunched(callback: (...args: any[]) => void): void;
    onShareSheetDismissed(callback: (...args: any[]) => void): void;
    onLinkShareResponse(callback: (...args: any[]) => void): void;
    onChannelSelected(callback: (...args: any[]) => void): void;
    listOnSpotlight(): Promise<any>;
}

interface NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, err?: (error) => any, name?: string) => void;
}
