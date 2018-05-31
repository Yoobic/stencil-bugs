declare namespace IonicNative {
    
    export interface Geolocation {
        getCurrentPosition: (options: any) => any;
    }

    export interface Network {
        type: string;
        connection: string;
        onDisconnect: () => any;
        onConnect: () => any;
    }
}
