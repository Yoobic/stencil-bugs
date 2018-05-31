import { Translate } from '@shared/translate';
import { Broker, ResponseObject } from '../broker/broker.service';
import { Models } from '../models/models.service';

import { Entity } from '../../interfaces/entity/entity.interface';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { Query } from '@shared/interfaces';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, mergeMap } from 'rxjs/operators';

import { orderBy, isArray, isObject, keys, isEqual, isFunction, isEmpty, isNumber } from 'lodash-es';

export class DataLoader {

    public get pageSize() {
        return this._pageSize;
    }

    public set pageSize(val) {
        this._pageSize = val;
    }

    public get currentPage() {
        return this._currentPage;
    }

    public get total() {
        return this._total;
    }

    public set total(value) {
        this._total = value;
    }

    public get totalPage() {
        return Math.ceil(this._total / this.pageSize);
    }

    public get loading() {
        return this._loading;
    }

    public get loadingPageCount() {
        return this._loadingPageCount;
    }

    public set loadingPageCount(value) {
        this._loadingPageCount = value;
    }

    private _currentPage = 0;
    private _total = 0;
    private _collectionName = '';
    private _loading = false;
    private _pageSize: number; //CoreConfig.isWeb() ? 30 :
    private _items: Array<any>;
    private _translate: boolean;
    private filterPipe: FilterPipe;
    private _looseCount: boolean;
    private _loadingPageCount: boolean;

    constructor(private broker: Broker, collectionName: string, items: Array<any> = null, pageSize: number = null, translate: boolean = null, translateService: Translate = null, looseCount: boolean = null) {
        this._collectionName = Models.fixCollectionName(collectionName);
        this._items = items;
        this._translate = translate;
        this._looseCount = looseCount;
        if (pageSize && isNumber(pageSize) && pageSize > 0) {
            this._pageSize = pageSize;
        } else {
            this._pageSize = 21;
        }
        this.filterPipe = new FilterPipe(translateService);
    }

    loadWithSearch(currentPage: number = 0, search: string = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields: string[] = null, include: string[] = null, aggregateOptions: (skip, limit) => Array<any> = null, cacheId: string = null, customFilter: any = null, includeCount = false) {
        return this.load(currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, cacheId, customFilter, includeCount);
    }

    loadWithSearchDebounce(start = 0, search: Observable<string> = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields: string[] = null, include: string[] = null, aggregateOptions: (skip, limit) => Array<any> = null, cacheId: string = null, customFilter: any = null, includeCount = false) {
        if (search) {
            return search.pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(term => this.load(start, term.toString(), filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, cacheId, customFilter, includeCount))
            );
        } else {
            return this.load(start, null, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, cacheId, customFilter, includeCount);
        }
    }

    load(currentPage: number = 0, search: string = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields: string[] = null, include: string[] = null, aggregateOptions: (skip, limit) => Array<any> = null, cacheId: string = null, customFilter: any = null, includeCount = false) {
        this._loading = true;
        if ((this._items && this._items.length > 0) || !this._collectionName || isEmpty(this._collectionName)) {
            let obs = new Observable(observer => {
                let data = this._items || [];
                if (search) {
                    data = this.filterPipe.transform(data, search, null, null, this._translate);
                }
                if (sortModel) {
                    data = orderBy(data, sortModel.map(s => s.colId), sortModel.map(s => s.sort.toLowerCase()));
                }
                this._total = data.length;
                this._currentPage = currentPage;

                if (data.slice) {
                    data = data.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize);
                }

                let res: ResponseObject = {
                    count: this._total,
                    data: data.map ? data.map(value => this.convertItem(value)) : []
                };
                observer.next(res);
                observer.complete();
            });
            if (mapTransformAsync && mapTransform) {
                return obs.pipe(mergeMap(res => mapTransform(res, search, filters, currentPage, this.pageSize)));
            } else if (mapTransform) {
                return obs.pipe(map(res => mapTransform(res, search, filters, currentPage, this.pageSize)));
            } else {
                return obs;
            }
        } else if (aggregateOptions && isFunction(aggregateOptions)) {
            if (!mapTransform) {
                mapTransform = (x) => x;
            }
            return this.broker.aggregateQuery(this._collectionName, filters, aggregateOptions(currentPage * this.pageSize, this.pageSize), search, null, includeCount, cacheId, customFilter, subQuery)
                .pipe(map(res => mapTransform(res, search, filters, currentPage, this.pageSize)))
                .pipe(map(retVal => {
                    this._currentPage = currentPage;
                    if (includeCount) {
                        this._total = retVal.count;
                    } else if (isObject(retVal) && isArray(retVal.data)) {
                        //nothing to do. used in photo duplicate
                    } else {
                        retVal = { data: retVal };
                    }
                    this._loading = false;
                    return retVal;
                }));
        } else {
            let retVal = this.broker.getAll(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, tag, subQuery, customFilter, cacheId, this._looseCount, !includeCount)
                .pipe(map((res: any) => {
                    this._currentPage = currentPage;
                    this._loading = false;
                    if (!includeCount) {
                        this._total = Math.max(-1, this._total);
                        return { count: this._total, data: res };
                    } else {
                        this._total = res.count;
                        return res;
                    }

                }));
            if (mapTransformAsync && mapTransform) {
                return retVal.pipe(mergeMap(res => mapTransform(res, search, filters, currentPage, this.pageSize)));
            } else if (mapTransform) {
                return retVal.pipe(map(res => mapTransform(res, search, filters, currentPage, this.pageSize)));
            } else {
                return retVal;
            }
        }
    }

    getQuery(currentPage: number = 0, search: string, filters = [], sortModel = null, subQuery = null, fields: string[] = null, include: string[] = null, customFilter: any = null, includeCount = false): Query {
        return this.broker.getQuery(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, subQuery, customFilter);
    }

    getCount(search?: string, filters?, subQuery = null, customFilter = null) {
        return this.broker.getCount(this._collectionName, search, filters, subQuery, customFilter).pipe(
            map(ret => {
                this._total = ret.count;
                return ret;
            }));
    }

    convertItem(value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return new Entity(value);
        } else if (isEqual(keys(value), ['_id'])) {
            return new Entity(value._id);
        } else if (typeof value === 'undefined') {
            return new Entity('undefined');
        } else {
            return value;
        }

    }
}
