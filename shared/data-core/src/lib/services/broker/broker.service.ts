import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Models } from '../models/models.service';
import { Googlemaps } from '../googlemaps/googlemaps.service';
import { Workplace } from '../workplace/workplace.service';
import { Session } from '../session/session.service';
import { Files } from '../files/files.service';
import { Box } from '../box/box.service';
import { Config } from '../config/config.service';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { ISort } from '../../interfaces/sort/sort.interface';
import { Location } from '../../interfaces/location/location.interface';
export * from '../../interfaces/response-object/response-object.interface';

import { Filters, Query, SubQuery, moment } from '@shared/interfaces';

import { Position, CoreConfig, PromiseService, Log, LocalForageService, Network } from '@shared/common';

import { FileUploader } from 'ng2-file-upload';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { uniq, compact, get, set, assign, isArray, isString, isObject, isEmpty, flatten, forEach, concat, remove, cloneDeep } from 'lodash-es';

import { Observable, Observer, forkJoin, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Broker {

    protected forceOnline: boolean = false;

    constructor(private rq: Requestor, private box: Box, private googlemaps: Googlemaps, private workplace: Workplace, private session: Session, private files: Files, private promise: PromiseService, private coreConfig: CoreConfig, private log: Log, private network: Network, private transfer: FileTransfer, private localForage: LocalForageService, public config: Config, protected injector: Injector) {
        this.init();
    }

    init() {

    }

    getApiUrl() {
        return this.config.apiUrl;
    }

    getServerUrl() {
        return this.config.serverUrl;
    }

    getCollectionName(collectionName: string) {
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            return 'custommodelinstances';
        }
        return collectionName;
    }

    getById(collectionName: string, id: string, fields?: Array<string>, include?: Array<string>, idAttributeName?: string) {
        let query = this.getQuery(collectionName, fields, include);
        delete query.limit;
        delete query.skip;
        delete query.order;
        delete query.subQuery;
        if (!idAttributeName || idAttributeName === '_id') {
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(query));
            return this.rq.get(url);
        } else {
            let filters: Filters = [[{ field: idAttributeName, operator: { _id: 'eq' }, value: id }]];
            return this.getAll(collectionName, fields, include, null, filters).pipe(map(res => {
                if (res.data && res.data.length > 0) {
                    return res.data[0];
                }
                return null;
            }));
        }
    }

    setAcl(entity, group?: string | Array<string>, addWrite: boolean = false, collectionName?: string, users?: Array<string>) {
        //entity._acl = entity._acl || { groups: { r: ['admin'], w: ['admin', 'manager'] } };
        entity._acl = entity._acl || { groups: { r: [], w: [] } };
        entity._acl.creator = entity._acl && entity._acl.creator ? entity._acl.creator : this.session.user ? this.session.user._id : null;
        entity._acl.groups = entity._acl && entity._acl.groups ? entity._acl.groups : {};
        if (group) {
            entity._acl.groups.r = uniq([].concat(group).concat(entity._acl.groups.r));
        }
        entity._acl.groups.r = compact(entity._acl.groups.r);
        //entity._acl.groups.w = compact(uniq(['admin', 'manager'].concat(entity._acl.groups.w || [])));
        entity._acl.groups.w = compact(uniq([].concat(entity._acl.groups.w || [])));

        if (collectionName === 'translations' && group) {
            entity._acl.groups.r = uniq([].concat(group));
            entity._acl.groups.w = uniq([].concat(group));
        }
        if (addWrite && group) {
            entity._acl.groups.w = compact(uniq([].concat(group).concat(entity._acl.groups.w)));
        }
        if (users && users.length > 0) {
            //entity._acl.users = { r: users, w: users };
            entity._acl.groups.r = entity._acl.groups.r.concat(users);
        }
    }

    getCurrentGroups() {
        if (this.session.roles.indexOf('admin') < 0) {
            return this.session.groups;
        } else {
            return ['debug_v2'];
        }
    }

    updateCustomModel(collectionName: string, entity: any) {
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            entity._modelName = collectionName;
            if (entity.location && entity.location._id) {
                entity.locationRef = entity.location._id;
            }
        }
    }

    create(collectionName: string, entity: any) {
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        this.updateCustomModel(collectionName, entity);
        return this.rq.post(url, entity);
    }

    update(collectionName: string, entity: any) {
        if (collectionName === 'groups') {
            let url = this.config.apiUrl + this.getCollectionName(collectionName);
            this.updateCustomModel(collectionName, entity);
            return this.rq.put(url, entity);
        } else {
            if (entity._id) {
                return this.patch(collectionName, entity);
            } else {
                return this.create(collectionName, entity);
            }
        }

    }

    patch(collectionName: string, entity: any) {
        if (!entity || !entity._id) {
            throw new Error('Cant patch an empty entity or an entity without an id');
        }
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + entity._id;
        this.updateCustomModel(collectionName, entity);
        return this.rq.patch(url, entity);
        // .flatMap(ret => {
        //     return this.getById(collectionName, entity._id);
        // });
    }

    upsert(collectionName: string, entity: Object, previousEntity?: Object, skipAcl?: boolean): Observable<any> {
        if (!skipAcl) {
            this.setAcl(entity, (<any>entity).group, false, collectionName);
        }
        this.incrementTags(collectionName, entity).subscribe(() => { });
        let suffixs = collectionName === 'missiondatas' ? ['.value', '.edit', '.value.fieldValue'] : ['._downloadURL'];
        if (this._hasFiles(entity, suffixs)) {
            return new Observable<ResponseObject>((observer: Observer<any>) => {
                this.uploadEntityFiles(entity, suffixs).then(() => {
                    this.update(collectionName, entity).subscribe((ret) => {
                        if (ret._downloadURL && this.files.isDocument(ret._downloadURL)) {
                            this.box.upload(ret._downloadURL).subscribe(boxId => {
                                if (boxId) {
                                    ret.boxId = boxId;
                                }
                                this.update(collectionName, ret).subscribe(retval => {
                                    observer.next(retval);
                                    observer.complete();
                                });
                            });
                        } else {
                            observer.next(ret);
                            observer.complete();
                        }
                    });
                }, (err) => { });
            });
        } else {
            return this.update(collectionName, entity);
        }
    }

    upsertAll(collectionName: string, entities: Array<Object>): Observable<any> {
        let obs = entities.map(entity => this.upsert(collectionName, entity));
        return forkJoin(obs);
    }

    uploadEntityFiles(entity, suffixs: Array<string> = [], progressEmitter?: EventEmitter<any>, tags?: Array<string>, promisesOnly = false): Promise<any> {
        let properties = this._getFileProperties(entity, suffixs);
        let count = 0;
        let promises: Array<Promise<any>> = properties.map((prop) => {
            let promise;
            let file = get(entity, prop);
            promise = ((offsetIndex, total) => {
                return () => this.prepareUpload(file)
                    .then(f => {
                        return this.upload(f, progressEmitter, offsetIndex, total, tags);
                    }).then((url) => {
                        set(entity, prop, url);
                    }).catch((err: any) => Promise.reject(err));
            })(count, properties.length);
            count += 1;
            return promise;
        });
        if (promisesOnly) {
            return promises.length > 0 ? promises : <any>[() => Promise.resolve('empty')];
        }
        return this.promise.sequential(promises);
    }

    uploadEntitiesFiles(entities: Array<any>, suffixs: Array<string> = [], progressEmitter?: EventEmitter<any>, tags?: Array<string>) {
        let promises = entities.map(entity => {
            return () => this.uploadEntityFiles(entity, suffixs, progressEmitter, tags, false);
        });
        return this.promise.sequential(promises);
    }

    prepareUpload(file) {
        return this.files._requestExternalStoragePermission().then(() => {
            if (this.files.isBase64(file)) {
                return Promise.resolve(this.files.b64toBlob(file));
            } else if (this.files.isFileUri(file)) {
                return this.files.resolveFilePath(<string>file);
            } else {
                return Promise.resolve(file);
            }
        });
    }

    updateAll(collectionName: string, query: Query, entity: any) {
        let rawQuery: any = assign({}, query.where);
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        if (entity.group) {
            entity['_acl.groups.r'] = entity.group;
        }
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/update?where=' + encodeURIComponent(JSON.stringify(rawQuery));
        return this.rq.post(url, entity);
    }

    upload(file: any, progressEmitter?: EventEmitter<any>, offsetIndex = 0, total = 1, tags: Array<string> = []): Promise<string> {
        tags = concat([this.session.userId], tags);
        //check for file created from base64 if we can send them through cordova transfert plugin.
        if (this.coreConfig.isCordova() && file.nativeURL) {
            let fileTransfer = this.transfer.create();
            if (progressEmitter) {
                fileTransfer.onProgress((ev) => {
                    if (ev.lengthComputable) {
                        let percentage = ev.loaded / ev.total * 100 / total + offsetIndex * 100 / total;
                        progressEmitter.next(percentage);
                    }
                });
            }
            return fileTransfer.upload(file.nativeURL, this.config.uploadUrl, { fileKey: 'file', fileName: file.name, chunkedMode: false, params: { tags: tags } }).then((result: any) => {
                let retVal = JSON.parse(result.response);
                return this.files.getCloudinaryUrl(retVal);
            }).catch((err: any) => {
                let fileError = err && err.message ? err.message : 'File Error';
                return Promise.reject(fileError);
            });
        } else {
            let fileUploader = this.getFileUploader(null);
            return new Promise((resolve, reject) => {
                fileUploader.onBuildItemForm = (fileItem: any, form: any) => {
                    form.append('tags', JSON.stringify(tags));
                };
                fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any): any => {
                    this.log.log('upload finish');
                    fileUploader.clearQueue();
                    if (status === 200) {
                        let retVal = JSON.parse(response);
                        resolve(this.files.getCloudinaryUrl(retVal));
                    } else {
                        reject(response ? JSON.parse(response) : 'error');
                    }
                };
                if (progressEmitter) {
                    fileUploader.onProgressItem = (item: any, progress: any) => {
                        let percentage = progress / total + offsetIndex * 100 / total;
                        progressEmitter.next(percentage);
                    };
                }
                fileUploader.addToQueue([file]);
                fileUploader.queue[0].alias = 'undefined';
                //fileItem.alias = 'undefined';
                this.log.log('upload begin');
                fileUploader.uploadAll();
            });
        }
    }

    uploadData(data, progressEmitter?: EventEmitter<any>, offsetIndex = 0, total = 1) {
        let file = this.files.b64toBlob(data);
        return this.upload(file, progressEmitter, offsetIndex, total);
    }

    incrementTags(collectionName: string, entity: any): Observable<any> {
        if (entity.tags && entity.tags.length > 0) {
            let tags = uniq(compact([].concat(entity.tags)));
            let url = this.config.apiUrl + 'tags/incrementTags';
            return this.rq.post(url, { params: { collectionName: Models.fixCollectionName(collectionName), tags, groups: [].concat(entity.group || entity._acl.groups.r), entity } });
        }
        return of(null);
    }

    updateTags(collectionName: string) {
        let url = this.config.apiUrl + 'tags/updateTags';
        return this.rq.post(url, { params: { collection: collectionName } });
    }

    createAllTags() {
        let url = this.config.apiUrl + 'businessLogic/createAllTags';
        return this.rq.post(url, { params: {} });
    }

    deleteOld(collectionName: string, id: string) {
        let url = this.config.apiUrl + 'endpoints/clean';
        return this.rq.post(url, { params: { collection: collectionName, query: { '_id': { 'inq': [id] } } } });
    }

    deleteAllOld(collectionName: string, query: Query) {
        let url = this.config.apiUrl + 'endpoints/clean';
        return this.rq.post(url, { params: { collection: collectionName, query: query.where || { '_id': { 'exists': true } } } });
    }

    delete(collectionName: string, id: string) {
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + encodeURIComponent(id);
        return this.rq.delete(url);
    }

    deleteAll(collectionName: string, query: Query) {
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        let rawQuery: any = assign({}, query.where || { '_id': { 'exists': true } });
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        return this.rq.delete(url, rawQuery);
    }

    getQuery(collectionName: string, fields?: Array<string>, include?: Array<string>, search?: string, filters?: Filters | Object, sorts?: Array<ISort>, skip = 0, limit = 20, subQuery: SubQuery = null, customFilter = null): Query {
        let model = Models.getModelByCollectionName(collectionName);
        if (model) {
            fields = fields && fields.length > 0 ? fields : model.fields;
            include = include || model.include;
            if (model && model.isCustom) {
                if (!filters || (isArray(filters) && (<Array<any>>filters).length < 1)) {
                    filters = [[]];
                }
                if (isArray(filters)) {
                    filters = cloneDeep(filters);
                    (<any>filters).forEach(f => {
                        f.push({ field: '_modelName', operator: { _id: 'eq' }, value: model.collectionName });
                    });
                }
            }
        }

        let query: Query = {};
        if (skip && skip > 0) {
            query.skip = skip;
        }

        if (limit && limit > 0) {
            query.limit = limit;
        }

        if (sorts && sorts.length > 0) {
            query.order = sorts.map((s) => isString(s) ? <any>s : s.colId + ' ' + s.sort.toUpperCase());
        } else if (sorts && sorts.length === 0) {
            query.order = [];
        } else {
            query.order = ['_lmt DESC'];
        }
        let searchWhere = null;
        let filterWhere = null;
        if (search && !model.searchSubquery) {
            searchWhere = Models.exportSearch(collectionName, search);
        }

        if (filters && isArray(filters) && (<Array<any>>filters).length > 0) {
            filterWhere = Models.exportWhere(collectionName, <Filters>filters);
        } else if (filters && !isArray(filters) && isObject(filters)) {
            filterWhere = filters;
        }
        if (searchWhere && filterWhere) {
            query.where = { and: [searchWhere, filterWhere] };
        } else if (searchWhere) {
            query.where = searchWhere;
        } else if (filterWhere) {
            query.where = filterWhere;
        }

        if (customFilter && query.where) {
            query.where = { and: [query.where, customFilter] };
        } else if (customFilter) {
            query.where = customFilter;
        }

        if (fields && fields.length > 0) {
            query.fields = fields;
        }

        if (!isEmpty(include)) {
            query.include = include;
        }

        if (subQuery) {
            query.subQuery = subQuery;
        }

        let filterSubquery = Models.exportSubQuery(collectionName, filters);
        if (filterSubquery) {
            if (query.subQuery) {
                query.subQuery = [].concat(query.subQuery, filterSubquery);
            } else {
                query.subQuery = filterSubquery;
            }
        }
        //this is mainly used in the channel model because we want to filter on users properties
        if (search && model.searchSubquery) {
            searchWhere = Models.exportSearch(model.searchSubquery.collectionName, search);
            if (!query.subQuery) {
                query.subQuery = {
                    collectionName: model.searchSubquery.collectionName,
                    field: model.searchSubquery.field,
                    values: model.searchSubquery.values,
                    where: searchWhere
                };
            } else if (query.subQuery && !isArray(query.subQuery) && (<SubQuery>query.subQuery).where) {
                (<SubQuery>query.subQuery).where = { and: [searchWhere, (<SubQuery>query.subQuery).where] };
            }
        }
        return query;
    }

    getCount(collectionName: string, search?: string, filters?: Filters, subQuery: SubQuery = null, customFilter = null): Observable<ResponseObject> {
        let query = this.getQuery(collectionName, null, null, search, filters, null, null, null, subQuery, customFilter);
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/count'; //?where=' + encodeURIComponent(JSON.stringify(query.where || {}));
        let finalQuery: any = {};
        if (query.where) {
            finalQuery.where = query.where;
        }
        if (query.subQuery) {
            finalQuery.subQuery = query.subQuery;
        }
        return this.rq.post(url, finalQuery).pipe(map(res => {
            return { count: res || 0, data: [] };
        }));
    }

    getAll(collectionName: string, fields?: Array<string>, include?: Array<string>, search?: string, filters?: Filters, sorts?: Array<ISort>, skip = 0, limit = 20, tag = false, subQuery: SubQuery = null, customFilter = null, cacheId: string = null, looseCount: boolean = null, noCount: boolean = false): Observable<ResponseObject> {
        if (collectionName === 'googlemaps') {
            return this.getAllGoogleMaps(search);
        }
        if (collectionName.indexOf('workplace_') >= 0) {
            return this.getAllWorkplace(collectionName, search);
        }
        if (tag === true) {
            return this.getAllTags(collectionName, search, filters, skip, limit);
        } else {
            let query = this.getQuery(collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter);
            if (collectionName.indexOf('_store') >= 0) {
                return this.getAllOperation(collectionName, query);
            }
            let obs;
            if (this.network.isOffline() && !this.forceOnline) {
                if (cacheId) {
                    obs = from(this.localForage.get(cacheId)).pipe(map(res => {
                        return res || (noCount ? [] : { count: 0, data: [] });
                    }));
                } else {
                    obs = of(noCount ? [] : { count: 0, data: [] });
                }
            } else {
                obs = this.getAllQuery(collectionName, query, looseCount, noCount).pipe(map(res => {
                    if (cacheId) {
                        this.localForage.set(cacheId, res);
                    }
                    return res;
                }));
            }
            return obs;
        }
    }

    getAllTags(collectionName: string, search?: string, filters?: Filters, skip = 0, limit = 20) {
        filters = filters || [[]];
        //filters.forEach(f => f.push({ field: 'collectionName', operator: { _id: 'inq' }, value: [collectionName] }));
        let options = [
            { '$match': { 'collectionName': Models.fixCollectionName(collectionName) } },
            { '$group': { '_id': '$tag', 'count': { '$max': '$count' } } },
            { '$sort': { 'count': -1 } },
            { '$project': { '_id': 1, 'tag': '$_id', 'count': 1 } },
            { '$group': { '_id': 1, 'total': { '$sum': 1 }, 'data': { '$push': '$$ROOT' } } },
            { '$project': { 'count': '$total', 'data': { '$slice': ['$data', skip, skip + limit] } } }
        ];
        return this.aggregateQuery('tags', filters, options, search).pipe(map((res: any) => res && res.length > 0 ? ({ data: res[0].data, count: res[0].count }) : ({ data: [], count: 0 })));
    }

    getAllQuery(collectionName, query: Query, looseCount?: boolean, noCount?: boolean) {
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/find';
        return this.rq.post(url, { filter: query }, null, !noCount, false, looseCount);
        //let url = this.config.apiUrl + collectionName + '?filter=' + encodeURIComponent(JSON.stringify(query));
        //return this.rq.get(url, true);
    }

    getAllGoogleMaps(search?: string) {
        if (search) {
            return this.googlemaps.placePredictionsLocationObserver(search).pipe(map(predictions => {
                let details = flatten(predictions).filter(d => d.geometry && d.geometry.location);
                return {
                    count: details.length,
                    data: details.map(d => {
                        let position = new Position(d.geometry.location);
                        return { address: d.formatted_address, _geoloc: position.toGeoLoc(true), coords: position.toJson() };
                    })
                };
            }));
        } else {
            return of({ count: 0, data: [] });
        }
    }

    getAllWorkplace(collectionName: string, search?: string): Observable<ResponseObject> {
        let graphEntity = collectionName.replace('workplace_', '');
        switch (graphEntity) {
            case 'groups':
                return <any>this.workplace.getAllGroups();
        }
        return of({ count: 0, data: [] });
    }

    getAllOperation(collectionName: string, query: Query) {
        let url = this.config.apiUrl + 'Operation/findDocument';
        return this.rq.post(url, {
            collectionName: collectionName.replace('_store', ''),
            where: query.where,
            //operationId: (<any>query.where).operationId.inq[0],
            limit: query.limit,
            skip: query.skip
        }, null, true).pipe(map(res => {
            if (res.data && res.data.map) {
                res.data = res.data.map(r => r.doc);
            }
            return res;
        }));
    }

    aggregateQuery(collectionName: string, filters?: Filters, options?: Array<any>, search?: string, excludedFields?: Array<any>, includeCount = false, cacheId: string = null, customFilter?: any, subQuery?: SubQuery) {
        let obs: Observable<any>;
        if (this.network.isOffline() && !this.forceOnline) {
            if (cacheId) {
                obs = from(this.localForage.get(cacheId));
            } else {
                obs = of({ count: 0, data: [] });
            }
        } else if (collectionName === 'aggregateLogs') {
            return this.aggregateLogs(options);
        } else {
            let url = this.config.apiUrl + 'businesslogic/aggregateQuery';
            let match = {};
            let project = {};
            let filterWhere = null;
            let searchWhere = null;
            let defaultFields = [];
            let query: Query = <Query>{ collectionName, includeCount };
            if (filters && filters.length > 0) {
                filterWhere = Models.exportWhere(collectionName, filters, excludedFields);
            }

            if (search) {
                searchWhere = Models.exportSearch(collectionName, search);
            }

            if (searchWhere && filterWhere) {
                query.where = { and: [searchWhere, filterWhere] };
            } else if (searchWhere) {
                query.where = searchWhere;
            } else if (filterWhere) {
                query.where = filterWhere;
            }

            if (customFilter && query.where) {
                query.where = { and: [query.where, customFilter] };
            } else if (customFilter) {
                query.where = customFilter;
            }
            query.where = query.where || {};

            if (defaultFields && defaultFields.length > 0) {
                defaultFields.forEach((field, i) => { project[field] = 1; });
            }

            if (!isEmpty(project)) {
                options.unshift({ $project: project });
            }
            if (!isEmpty(match)) {
                options.unshift({ $match: match });
            }

            query.options = options;
            query.subQuery = Models.exportSubQuery(collectionName, filters);
            if (subQuery) {
                query.subQuery = subQuery;
            }

            obs = this.rq.post(url, { params: query }).pipe(map(retVal => {
                if (cacheId) {
                    this.localForage.set(cacheId, retVal);
                }
                return retVal;
            }));
        }

        return obs.pipe(map((retVal: any) => {
            let data = [];
            if (retVal && retVal.data && retVal.data.length > 0) {
                if (includeCount) {
                    data = retVal.data[0];
                } else {
                    data = retVal.data;
                }
            }
            return data;
        }));
    }

    aggregateLogs(stages?: Array<any>, groups?: Array<string>, userIds?: Array<string>) {
        let url = this.config.apiUrl + 'AdminDashboard/aggregateLogs';
        return this.rq.post(url, { stages, groups, userIds });
    }

    createFile(file: File, group: string | Array<string>, hideMobile = true, fileName?: string) {
        return this.upsert('files', {
            _downloadURL: file,
            _filename: file.name,
            group: group,
            hideMobile: hideMobile,
            mimeType: file.type,
            size: file.size
        });
    }

    getFileUploader(fileTypes?, maxFileSize?) {
        let options: any = {
            maxFileSize: maxFileSize,
            url: this.config.uploadUrl
        };
        // if (fileTypes && fileTypes.length > 0) {
        //     options.allowedFileType = fileTypes;
        // }
        return new FileUploader(options);
    }

    execute(params) {
        let url = this.config.apiUrl + 'Endpoints/execute';
        return this.rq.post(url, { params });
    }

    undoOperation(operationId: string) {
        let url = this.config.apiUrl + 'operation/undoDelete';
        return this.rq.post(url, { operationId });
    }

    getMarkers(locations: Array<Location>) {
        return locations.filter((l: Location) => l._geoloc && l._geoloc.length > 1).map((l: Location) => {
            return {
                _id: l._id,
                address: l.address,
                latitude: l._geoloc[1],
                longitude: l._geoloc[0],
                title: l.title,
                color: l.status === 'place' ? 'balanced' : (l.status === 'file' ? 'positive' : (l.status === 'error' ? 'assertive' : (l.status === 'prediction' ? 'royal' : 'dark')))
            };
        });
    }

    getUserOrLocationStat(id: string | Array<string>, mode: string, customFilter?: any): Observable<Array<{ _id: string; booked: number; count: number; finished: number; archived: number; validated: number; rejected: number; tobevalidated: number; available: number; }>> {
        let value: Array<any> = <any>(isString(id) ? [{ _id: id }] : id);
        let ref = mode === 'campaign' ? 'descriptionRef' : (mode === 'location' ? 'locationRef' : 'ownerRef');
        let filters = [[{ field: ref, operator: { _id: 'inq' }, value: value }]];

        let options = [{
            '$project': {
                _id: '$' + ref,
                booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                archived: { $cond: { if: { $eq: ['$status', 'archived'] }, then: 1, else: 0 } },
                validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } },
                rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } },
                finishedDate: '$finishedDate'
            }
        }, {
            '$group': {
                _id: '$_id', booked: { $sum: '$booked' }, finished: { $sum: '$finished' }, archived: { $sum: '$archived' }, validated: { $sum: '$validated' }, rejected: { $sum: '$rejected' }, latest: { $max: '$finishedDate' }, count: { $sum: 1 }
            }
        }];
        return this.aggregateQuery('missions', filters, options, null, null, false, null, customFilter).pipe(map((stats: any) => {
            if (stats && stats.length > 0) {
                stats[0].available = (stats[0].count || 0) - (stats[0].finished || 0) - (stats[0].booked || 0) - (stats[0].archived || 0);
                stats[0].tobevalidated = (stats[0].finished || 0) - (stats[0].validated || 0) - (stats[0].rejected || 0);
            }
            return stats;
        }));
    }

    setTimescale(filters: Filters, timescale: string, dateField = 'finishedDate', endDate?: Date | string) {
        if (timescale) {
            filters = filters || [];
            filters.forEach(fs => {
                fs = fs || [];
                remove(fs, (f) => f.field === dateField);
                fs.push({ field: dateField, operator: { _id: 'between', interval: true }, value: getStartAndEndDates(timescale, endDate) });
            });
        }
    }

    private _hasFiles(entity, suffixs: Array<string> = []): boolean {
        let retVal = false;
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal = true;
            }
            forEach(suffixs, (suffix) => {
                if (suffix) {
                    let object = get(entity, prop + suffix);
                    if (isArray(object)) { // for multiphoto field, value is an array;
                        let extraDataSuffix = '.extraData';
                        let extraData = get(entity, prop + extraDataSuffix);
                        object.forEach((v, index) => {
                            if (this.files.isImageFile(v)) {
                                retVal = true;
                            }
                            if (extraData && extraData[index] && extraData[index].edit) {
                                if (this.files.isImageFile(extraData[index].edit)) {
                                    retVal = true;
                                }
                            }
                        });
                    } else {
                        if (this.files.isImageFile(get(entity, prop + suffix))) {
                            retVal = true;
                        }
                    }
                }
            });
        }
        return retVal;
    }

    private _getFileProperties(entity, suffixs: Array<string> = []): Array<string> {
        let retVal = [];
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal.push(prop);
            }
            forEach(suffixs, (suffix) => {
                if (suffix) {
                    let objectPath = get(entity, prop + suffix);
                    // for multiphoto field, value is an array; and for todo with linked multi photo we need to do it to
                    if (isArray(objectPath)) {
                        let extraDataSuffixs = ['.extraData', '.value.fieldExtra'];
                        extraDataSuffixs.forEach(extraDataSuffix => {
                            let extraData = get(entity, prop + extraDataSuffix);
                            objectPath.forEach((v, index) => {
                                if (this.files.isImageFile(v)) {
                                    retVal.push(prop + suffix + '[' + index + ']');
                                }
                                if (extraData && extraData[index] && extraData[index].edit) {
                                    if (this.files.isImageFile(extraData[index].edit)) {
                                        retVal.push(prop + extraDataSuffix + '[' + index + ']' + '.edit');
                                    }
                                }
                            });
                        });
                    } else {
                        if (this.files.isImageFile(objectPath)) {
                            retVal.push(prop + suffix);
                        }
                    }
                }
            });
        }
        retVal = uniq(retVal);
        return retVal;
    }

}

export function getStartAndEndDates(timescale, endDate?: Date | string, amount?: number, notsliding?: boolean) {
    let lastDate = endDate || new Date();
    amount = amount || 7;
    let period = 'days';
    let startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;

        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            } else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }

            break;
    }
    //use .utc() to get the startOf with no offset issues
    return [moment(lastDate).utc().add(<any>-amount, <any>period).startOf(<any>startof).toISOString(), moment(lastDate).toISOString()];
}
