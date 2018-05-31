export interface IPosition {
    latitude: number;
    longitude: number;
    accuracy?: number;
}

export interface ILatLng {
    lat: number;
    lng: number;
}

export interface Marker {
    _id?: string;
    latitude: number;
    longitude: number;
    title?: string;
    color?: string;
    address?: string;
    status?: string;
    validated?: boolean;
    missionRef?: string;
}

export interface Address {
    address: string;
    _geoloc: [number, number];
    coords: { latitude: number, longitude: number };
}
