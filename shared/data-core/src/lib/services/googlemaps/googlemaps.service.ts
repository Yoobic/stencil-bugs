/* tslint:disable:variable-name */
import { Injectable, Injector } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';

import { Smartloc } from '../smartloc/smartloc.service';
import { Position } from '@shared/common';
import { Translate } from '@shared/translate';
import { IAutocompleteInput, IAutocompletePrediction, IAutocompleteResponse, IBounds, IGeocodeInput, IGeocodeResult, IGeocodeResponse, INearbySearchInput, INearbySearchResponse, IReverseGeocodeInput, IReverseGeocodeResponse, IResolvedAddressLocationInput, IResolvedAddressLocationResult } from '../../interfaces/googlemaps/googlemaps.interface';

import { concatMap, map } from 'rxjs/operators';
import { Observable, from, combineLatest } from 'rxjs';

function normalizeBounds(b: string | IBounds): string {
    return b ? (typeof b === 'string' ? b : b.southwest.lat + ',' + b.southwest.lng + '|' + b.northeast.lat + ',' + b.northeast.lng) : '';
}

function normalizeLocation(p: string | Position): string {
    return p ? (typeof p === 'string' ? p : p.toStringLoc()) : '';
}

function pipeJoin(p: string | string[]): string {
    return p ? (typeof p === 'string' ? p : p.join('|')) : '';
}

function normalizeObservable<T>(o: Observable<T> | Promise<T> | T): Observable<T> {
    return o instanceof Observable ? o : from(Promise.resolve(o));
}

@Injectable()
export class Googlemaps {
    private translate: Translate;
    constructor(private rq: Requestor, private geo: Smartloc, private config: Config, protected injector: Injector) {
        this.translate = this.injector.get<Translate>(Translate);
    }

    public autocompleteFromSync(
        input: string,
        location: string | Position,
        offset: number = input.length,
        radius = 100000,
        language: string = this.translate.getCurrentLanguage(),
        types?: string,
        components?: string,
        query = false
    ): Observable<IAutocompletePrediction[]> {
        return this._autocomplete({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components
        }, query);
    }

    public autocompleteLocationObserver(
        input: string,
        offset: number = input.length,
        location: Observable<string | Position> | Promise<string | Position> | string | Position = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        radius = 1000,
        language: string = this.translate.getCurrentLanguage(),
        types?: string,
        components?: string,
        query = false
    ): Observable<IAutocompletePrediction[]> {
        return normalizeObservable(location).pipe(
            map((loc): IAutocompleteInput => {
                return {
                    input,
                    offset,
                    location: normalizeLocation(loc),
                    radius,
                    language,
                    types,
                    components
                };
            }),
            concatMap((i) => this._autocomplete(i, query))
        );
    }

    public autocompleteMultiObserver(
        inputO: Observable<string>,
        offsetO: Observable<number> = inputO.pipe(map(s => s.length)),
        locationO: Observable<string | Position> = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        radius = 1000,
        language: string = this.translate.getCurrentLanguage(),
        types?: string,
        components?: string,
        query = false
    ): Observable<IAutocompletePrediction[]> {
        return combineLatest(inputO, offsetO, locationO)
            .pipe(concatMap((i: any) => this._autocomplete(i, query)));
    }

    public nearbySearchFromSync(
        location: string | Position,
        radius = 1000,
        keyword?: string,
        language: string = this.translate.getCurrentLanguage(),
        name?: string | string[],
        minprice?: number,
        maxprice?: number,
        opennow?: boolean,
        rankby?: string,
        type?: string,
        types?: string | string[]
    ): Observable<INearbySearchResponse> {
        return this._nearbySearch({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name: pipeJoin(name),
            minprice,
            maxprice,
            opennow,
            rankby,
            type,
            types: pipeJoin(types)
        });
    }

    public nearbySearchNextResults(
        next_page_token: string
    ): Observable<INearbySearchResponse> {
        return this._nextSearchResults(next_page_token);
    }

    public nearbySearchLocationObserver(
        location: Observable<string | Position> | Promise<string | Position> | string | Position = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        radius = 1000,
        keyword?: string,
        language: string = this.translate.getCurrentLanguage(),
        name?: string | string[],
        minprice?: number,
        maxprice?: number,
        opennow?: boolean,
        rankby?: string,
        type?: string,
        types?: string | string[]
    ): Observable<INearbySearchResponse> {
        return normalizeObservable(location).pipe(
            map((loc): INearbySearchInput => {
                return {
                    location: normalizeLocation(loc),
                    radius,
                    keyword,
                    language,
                    name: pipeJoin(name),
                    minprice,
                    maxprice,
                    opennow,
                    rankby,
                    type,
                    types: pipeJoin(types)
                };
            }),
            concatMap((input) => this._nearbySearch(input))
        );
    }

    public nearbySearchMultiObserver(
        locationO: Observable<string | Position> = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        keywordO?: Observable<string>,
        radius = 1000,
        language: string = this.translate.getCurrentLanguage(),
        nameO?: Observable<string | string[]>,
        minprice?: number,
        maxprice?: number,
        opennow?: boolean,
        rankby?: string,
        type?: string,
        types?: string | string[]
    ): Observable<INearbySearchResponse> {
        return combineLatest(keywordO, nameO, locationO)
            .pipe(concatMap((i: any) => this._nearbySearch(i)));
    }

    public geocodeFromSync(
        address?: string,
        components?: string | string[],
        bounds?: string | IBounds,
        language: string = this.translate.getCurrentLanguage(),
        region?: string
    ): Observable<IGeocodeResult[]> {
        return this._geocode({
            address,
            components: pipeJoin(components),
            bounds: normalizeBounds(bounds),
            language,
            region
        });
    }

    public geocodeAddressObserver(
        address: Observable<string>,
        components?: string | string[],
        bounds?: string | IBounds,
        language: string = this.translate.getCurrentLanguage(),
        region?: string
    ): Observable<IGeocodeResult[]> {
        return address.pipe(
            map((addr): IGeocodeInput => {
                return {
                    address: addr,
                    components: pipeJoin(components),
                    bounds: normalizeBounds(bounds),
                    language,
                    region
                };
            }),
            concatMap((i) => this._geocode(i))
        );
    }

    public reverseGeocodeFromSyncLocation(
        latlng: string | Position,
        language: string = this.translate.getCurrentLanguage(),
        result_type?: string,
        location_type?: string
    ): Observable<IGeocodeResult[]> {
        return this._reverseGeocode({
            latlng: normalizeLocation(latlng),
            language,
            result_type,
            location_type
        });
    }

    public reverseGeocodeLatLngObserver(
        latlng: Observable<string | Position> | Promise<string | Position> | string | Position = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        language: string = this.translate.getCurrentLanguage(),
        result_type?: string,
        location_type?: string
    ): Observable<IGeocodeResult[]> {
        return normalizeObservable(latlng).pipe(
            map((loc): IReverseGeocodeInput => {
                return {
                    latlng: normalizeLocation(loc),
                    language,
                    result_type,
                    location_type
                };
            }),
            concatMap((i) => this._reverseGeocode(i))
        );
    }

    public reverseGeocodeFromSyncPlaceID(
        place_id: string,
        language: string = this.translate.getCurrentLanguage(),
        result_type?: string,
        location_type?: string
    ): Observable<IGeocodeResult> {
        return this._reverseGeocode({
            place_id,
            language,
            result_type,
            location_type
        }).pipe(map(results => results[0]));
    }

    public reverseGeocodePlaceIDObserver(
        place_idO: Observable<string>,
        language: string = this.translate.getCurrentLanguage(),
        result_type?: string,
        location_type?: string
    ): Observable<IGeocodeResult> {
        return place_idO.pipe(
            map((place_id): IReverseGeocodeInput => {
                return {
                    place_id,
                    language,
                    result_type,
                    location_type
                };
            }),
            concatMap((i) => this._reverseGeocode(i)),
            map(results => results[0])
        );
    }

    public placePredictionsLocationObserver(
        input?: string,
        location: Observable<string | Position> | Promise<string | Position> | string | Position = from(this.geo.getLocation().then(pos => pos.toStringLoc())),
        language: string = this.translate.getCurrentLanguage(),
        offset: number = input.length,
        radius?: number,
        types?: string,
        components?: string,
        address?: string,
        search?: string,
        type?: string,
        limit?: number,
        nearbyRadius?: number,
        skipName?: boolean,
        debug?: boolean
    ): Observable<IGeocodeResult[]> {
        return normalizeObservable(location).pipe(
            map((loc): IAutocompleteInput | IResolvedAddressLocationInput => {
                return {
                    input,
                    offset,
                    location: normalizeLocation(loc),
                    radius,
                    language,
                    types,
                    components,
                    address,
                    search,
                    type,
                    limit,
                    nearbyRadius,
                    skipName,
                    debug
                };
            }),
            concatMap((i) => this._placePredictions(i))
        );
    }
    public placePredictionsFromSync(
        location: string | Position,
        input?: string,
        language: string = this.translate.getCurrentLanguage(),
        offset: number = input.length,
        radius?: number,
        types?: string,
        components?: string,
        address?: string,
        search?: string,
        type?: string,
        limit?: number,
        nearbyRadius?: number,
        skipName?: boolean,
        debug?: boolean
    ): Observable<IGeocodeResult[]> {
        return this._placePredictions({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }

    public nearbyPlaceCodesFromSync(
        location: string | Position,
        radius?: number,
        keyword?: string,
        language: string = this.translate.getCurrentLanguage(),
        name?: string | string[],
        minprice?: number,
        maxprice?: number,
        opennow?: boolean,
        rankby?: string,
        types?: string | string[],
        address?: string,
        search?: string,
        type?: string,
        limit?: number,
        nearbyRadius?: number,
        skipName?: boolean,
        debug?: boolean
    ): Observable<IGeocodeResult[]> {
        return this._nearbyPlaceCodes({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name,
            minprice,
            maxprice,
            opennow,
            rankby,
            types,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }

    public resolveAddressLocation(
        address: string,
        language: string = this.translate.getCurrentLanguage(),
        search?: string,
        type?: string,
        limit?: number,
        nearbyRadius?: number,
        skipName?: boolean,
        debug?: boolean
    ): Observable<IResolvedAddressLocationResult> {
        return this._resolveAddressLocation({
            address,
            language,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }

    private get apiUrl() {
        return this.config.apiUrl + 'GoogleMaps/';
    }

    private _autocomplete(input: IAutocompleteInput, query: boolean): Observable<IAutocompletePrediction[]> {
        return this.rq.post(`${this.apiUrl}place/autocomplete?query=${query}`, input).pipe(map((res: IAutocompleteResponse) => {
            return res.predictions;
        }));
    }

    private _placePredictions(input: IResolvedAddressLocationInput | IAutocompleteInput): Observable<IGeocodeResult[]> {
        return this.rq.post(this.apiUrl + 'place/predictions', input);
    }

    private _nearbyPlaceCodes(input: IResolvedAddressLocationInput | INearbySearchInput): Observable<IGeocodeResult[]> {
        return this.rq.post(this.apiUrl + 'place/nearby-place-codes', input);
    }

    private _resolveAddressLocation(input: IResolvedAddressLocationInput): Observable<IResolvedAddressLocationResult> {
        return this.rq.post(this.apiUrl + 'resolve-address-location', input);
    }

    private _nearbySearch(input: INearbySearchInput): Observable<INearbySearchResponse> {
        return this.rq.post(this.apiUrl + 'place/nearby', input);
    }

    private _nextSearchResults(next_page_token: string): Observable<INearbySearchResponse> {
        return this.rq.post(this.apiUrl + 'place/nearby', { next_page_token });
    }

    private _geocode(input: IGeocodeInput): Observable<IGeocodeResult[]> {
        return this.rq.post(this.apiUrl + 'geocode', input).pipe(map((res: IGeocodeResponse) => {
            return res.results;
        }));
    }

    private _reverseGeocode(input: IReverseGeocodeInput): Observable<IGeocodeResult[]> {
        return this.rq.post(this.apiUrl + 'reverse-geocode', input).pipe(map((res: IReverseGeocodeResponse) => {
            return res.results;
        }));
    }
}
