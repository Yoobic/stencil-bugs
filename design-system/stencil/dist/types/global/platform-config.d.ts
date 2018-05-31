export interface Platform {
    name: string;
    isMatch: () => boolean;
}
export declare const platformName: any;
export declare const platforms: Platform[];
