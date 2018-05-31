import { ILatLng } from '@shared/common';

export interface IBounds {
    northeast: ILatLng;
    southwest: ILatLng;
}

export interface IGeometry {
    location: ILatLng;
    location_type?: string;
    viewport: IBounds;
    bounds?: IBounds;
}

export interface IAutocompleteInput {
    input: string;
    offset?: number;
    location?: string;
    radius?: number;
    language?: string;
    types?: string;
    components?: string;
}

export interface IAutocompletePrediction {
    description: string;
    place_id: string;
    reference: string;
    id: string;
    terms: [{
        value: string,
        offset: number
    }];
    types: Array<string>;
    matched_substrings: [{
        offset: number,
        length: number
    }];
}

export interface IAutocompleteResponse {
    status: string;
    predictions: IAutocompletePrediction[];
    error_message?: string;
}

export interface INearbySearchInput {
    location: string;
    radius: number;
    keyword?: string;
    language?: string;
    minprice?: number;
    maxprice?: number;
    name?: string;
    opennow?: boolean;
    rankby?: string;
    type?: string;
    types?: string;
}

export interface INearbySearchResult {
    icon?: string;
    id?: string;
    geometry: IGeometry;
    name?: string;
    opening_hours?: {
        open_now: boolean;
    };
    photos?: [{
        photo_reference: string;
        height: number;
        width: number;
        html_attributions?: string[];
    }];
    place_id?: string;
    scope?: string;
    alt_ids?: {
        place_id: string;
        scope: string;
    };
    price_level?: number;
    rating?: number;
    reference?: string;
    types?: string[];
    vicinity?: string;
    formatted_address?: string;
    permanently_closed?: boolean;
}

export interface INearbySearchResponse {
    status: string;
    results: INearbySearchResult[];
    html_attributions?: string[];
    next_page_token?: string;
    error_message?: string;
}

export interface IGeocodeInput {
    address?: string;
    bounds?: string;
    language?: string;
    region?: string;
    components?: string;
}

export interface IGeocodeResult {
    types?: string[];
    formatted_address?: string;
    address_components?: [{
        types: string;
        long_name: string;
        short_name: string;
    }];
    postcode_localities?: string[];
    geometry?: IGeometry;
    partial_match?: boolean;
    place_id?: string;
}

export interface IGeocodeResponse {
    status: string;
    results: IGeocodeResult[];
    error_message?: string;
}

export interface IReverseGeocodeInput {
    latlng?: string;
    place_id?: string;
    language?: string;
    result_type?: string;
    location_type?: string;
}

export interface IReverseGeocodeResponse {
    status: string;
    results: IGeocodeResult[];
    error_message?: string;
}

export interface IResolvedAddressLocationResultDebug {
    stepsCompleted?: string[];
    stepsSucceeded?: string[];
    candidate?: IGeocodeResult;
    geocode?: IGeocodeResult[];
    nearby?: IGeocodeResult[];
    predictions?: IGeocodeResult[];
}

export interface IResolvedAddressLocationResult extends IResolvedAddressLocationResultDebug {
    source: string;
    address: string;
    coords: ILatLng;
    location_type?: string;
    description?: string;
}

export interface IResolvedAddressLocationInput {
    address: string;
    language?: string;
    search?: string;
    type?: string;
    nearbyRadius?: number;
    skipName?: boolean;
    debug?: boolean;
    limit?: number;
}
