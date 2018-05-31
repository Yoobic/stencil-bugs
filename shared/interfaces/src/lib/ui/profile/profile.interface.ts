export interface IProfileConfig {
    user: any;
    links: Array<{
        title: string;
        items: Array<{
            title: string;
            handler: () => void;
        }>
    }>;
    logoutText?: string;
    hideLogout?: boolean;
}