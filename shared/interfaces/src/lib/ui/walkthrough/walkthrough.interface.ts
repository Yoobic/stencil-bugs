export interface IWalkthroughEntry {
    title: string;
    subtitle?: string;
    imageUrl: string;
    type?: string;
}

export interface IWalkthroughSlideEvent {
    event: any;
    slide: IWalkthroughEntry;
}