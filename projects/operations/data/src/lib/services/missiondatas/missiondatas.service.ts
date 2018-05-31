import { Injectable } from '@angular/core';
import { ResponseObject, Slide, MissionDescription, Models, Requestor, Config } from '@shared/data-core';
import { FormFieldType, IFormField, Query } from '@shared/interfaces';
import { Translate } from '@shared/translate';
import { FormDynamicBuilder } from '@shared/data-form';

import { Mission } from '../../interfaces/mission/mission.interface';
import { Photo, PhotoExport } from '../../interfaces/photo/photo.interface';
import { MissionDataField, Missiondata } from '../../interfaces/missiondata/missiondata.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { forEach, get, keys } from 'lodash-es';

@Injectable()
export class Missiondatas {

    static extractPhoto(data, missiondata, field, name, type?: string, hideUser: boolean = false, multiIndex?: number) {
        return Models.extractPhoto(data, missiondata, field, name, type, hideUser, multiIndex);
    }

    constructor(private config: Config, private rq: Requestor, private translate: Translate, private formDynamicBuilder: FormDynamicBuilder) { }

    getCloudinaryInfo(imageUrl: string): Observable<any> {
        let url = this.config.apiUrl + 'photos/cloudinaryinfo';
        return this.rq.post(url, { url: imageUrl }).pipe(map(res => {
            return res;
        }));
    }

    getPhotoTransformFromPhotos() {
        return (res: ResponseObject) => {
            if (res.data && res.data.map) {
                res.data = res.data.map((photo: Photo) => {
                    let retVal = photo;
                    return retVal;
                });
            }
            return res;
        };
    }

    getPhotoDuplicateOptions(): { options: {}, transform: Function } {
        let options = (start, limit) => [
            { '$match': { 'phash': { '$exists': true } } },
            { '$group': { '_id': '$phash', 'keys': { '$addToSet': '$_id' } } },
            { '$match': { '$nor': [{ 'keys': { '$size': 0 } }, { 'keys': { '$size': 1 } }] } },
            { '$unwind': '$keys' },
            { '$project': { '_id': '$keys' } },
            ...(start > 0 ? [{ '$skip': start }] : []),
            ...(limit > 0 ? [{ '$limit': limit }] : []),
            { '$lookup': { 'from': 'photos', 'localField': '_id', 'foreignField': '_id', 'as': 'photo' } },
            { '$unwind': '$photo' },
            { '$lookup': { 'from': 'missiondescription', 'localField': 'photo.missiondescriptionRef', 'foreignField': '_id', 'as': 'photo.missiondescription' } },
            { '$unwind': '$photo.missiondescription' },
            { '$lookup': { 'from': 'user', 'localField': 'photo.userRef', 'foreignField': '_id', 'as': 'photo.user' } },
            { '$unwind': '$photo.user' },
            { '$lookup': { 'from': 'locations', 'localField': 'photo.locationRef', 'foreignField': '_id', 'as': 'photo.location' } },
            { '$unwind': '$photo.location' },
            {
                '$project': {
                    '_acl': '$photo._acl',
                    '_id': '$photo._id',
                    'phash': '$photo.phash',
                    '_lmt': '$photo._lmt',
                    '_ect': '$photo._ect',
                    'address': '$photo.address',
                    'data': '$photo.data',
                    'date': '$photo.date',
                    'location.title': '$photo.location.title',
                    'locationRef': '$photo.locationRef',
                    'missionRef': '$photo.missionRef',
                    'missiondataRef': '$photo.missiondataRef',
                    'missiondescription.title': '$photo.missiondescription.title',
                    'missiondescriptionRef': '$photo.missiondescriptionRef',
                    'name': '$photo.name',
                    'title': '$photo.title',
                    'type': '$photo.type',
                    'user.username,': '$photo.user.username,',
                    'user.imageData': '$photo.user.imageData',
                    'userDisplayname': '$photo.userDisplayname',
                    'userRef': '$photo.userRef',
                    'validated': '$photo.validated',
                    'value': '$photo.value'
                }
            }
        ];
        let transform = (retVal) => {
            // let retVal = photos || { data: [] };
            // retVal.data = retVal.data || [];
            // retVal.data = retVal.data && retVal.data.map ? retVal.data.map((data) => {
            //     return data.photo;
            // }) : [];
            // retVal.data = photos && photos.map ? photos.map((data) => {
            //     return data.photo;
            // }) : [];
            return this.getPhotoTransformFromPhotos()(<any>retVal);
        };
        return { options, transform };
    }

    getFieldHistoryTransform(field: IFormField) {
        return (res: ResponseObject) => {
            if (res.data && res.data.map) {
                res.data = res.data.map(data => {
                    let retVal = {
                        _id: data._id,
                        value: data[field.name] ? data[field.name].value : null,
                        comments: data[field.name] ? data[field.name].comments : null,
                        title: field.title,
                        name: field.name,
                        date: data.date,
                        validated: data.validated,
                        locationRef: data.locationRef,
                        userRef: data.userRef,
                        missionRef: data.missionRef,
                        userDisplayname: data.userDisplayname,
                        field: field
                    };
                    return retVal;
                });
            }
            return res;
        };
    }

    getPhotoFilter(missionDescriptionId?: string, title?: string, fields?: Array<any>, states?: Array<string>, type?: string | Object) {
        let and: Array<any> = [];
        if (type) {
            and.push({ type: type });
        }
        if (missionDescriptionId) {
            and.push({ missiondescriptionRef: { inq: [missionDescriptionId] } });
        }
        if (fields && fields.length > 0) {
            let or = [];
            fields.forEach(f => {
                or.push({ name: f.name.replace('.value', '') });
            });
            and.push({ or });
        }
        if (states && states.length > 0) {
            let validations = [];
            if (states.indexOf('validated') >= 0) { validations.push(true); }
            if (states.indexOf('rejected') >= 0) { validations.push(false); }
            if (validations.length > 0 && states.indexOf('tobevalidated') >= 0) {
                and.push({ or: [{ validated: { inq: validations } }, { validated: { exists: false } }] });
            } else if (validations.length > 0 && states.indexOf('tobevalidated') < 0) {
                and.push({ validated: { inq: validations } });
            } else if (validations.length <= 0 && states.indexOf('tobevalidated') >= 0) {
                and.push({ validated: { exists: false } });
            }
        }
        return and.length > 0 ? { and } : null;
    }

    getDefaultPhotoFields() {
        return ['_geoloc', '_geolocSave', 'address', 'date', 'locationRef', 'missionRef', 'missiondescriptionRef', 'photoCount', 'title', 'userDisplayname'];
    }

    extractPhotos(formDefinition, missiondata, type: string, hideUser: boolean = false) {
        let photos = [];
        forEach(formDefinition || missiondata, function (field: IFormField, name: string) {
            let data;
            if (formDefinition) {
                data = get(missiondata, field.name);
            } else {
                data = field;
            }
            if (field && field.type === FormFieldType.multiphotos && data && data.value && data.value.forEach && data.value.length > 0) {
                data.value.forEach((d, multiIndex) => {
                    let photo = Missiondatas.extractPhoto(d, missiondata, field, name, field.type, hideUser, multiIndex);
                    if (photo) {
                        photos.push(photo);
                    }
                });
            } else {
                let photo = Missiondatas.extractPhoto(data, missiondata, field, name, type, hideUser);
                if (photo) {
                    photos.push(photo);
                }
            }
        });
        return photos;
    }

    getPhotoTransformFromMissiondata() {
        return (res: ResponseObject) => {
            let photos = [];
            res.data.map((missiondata) => {
                photos = photos.concat(this.extractPhotos(null, missiondata, 'photo'));
            });
            res.data = photos;
            return res;
        };
    }

    getTransformPolyglotFromMissiondata() {
        let translate: Translate = this.translate;
        return (res: ResponseObject) => {
            if (res.data && res.data.forEach) {
                res.data.forEach(d => {
                    keys(d).forEach(key => {
                        if (d[key] && d[key].value) {
                            d[key].value = translate.polyglot(d[key].value);
                        }
                    });
                });
            }
            return res;
        };
    }

    hasScoring(missiondescription: MissionDescription) {
        return this.formDynamicBuilder.hasScoring(missiondescription);
    }

    calculateScoring(mission: Mission, data: { [key: string]: MissionDataField }) {
        this.formDynamicBuilder.calculateScoring(mission, data);
    }

    calculateScoringQuizz(mission: Mission, slides: Array<Slide>, data: { [key: string]: MissionDataField }) {
        this.formDynamicBuilder.calculateScoringQuizz(mission, slides, data);
    }

    answerIsValid(value, answer, field) {
        return this.formDynamicBuilder.answerIsValid(value, answer, field);
    }

    downloadPhotosZip(photoQuery: Query, prefixBy: Array<Array<string>>, photoExport: PhotoExport, channel?: string) {
        let url = this.config.apiUrl + 'businesslogic/downloadPhotoZip';
        let body = { photoQuery, prefixBy, useFolders: photoExport.oneFolderPerStore, channel, mode: photoExport.mode, emails: photoExport.emails };
        return this.rq.post(url, body);
    }

    getMarkers(missiondatas: Array<Missiondata>) {
        return missiondatas.filter((m: Missiondata) => m._geoloc && m._geoloc.length > 1).map((m: Missiondata) => {
            return {
                _id: m._id,
                address: m.address,
                status: m.validated === true ? 'validated' : (m.validated === false ? 'rejected' : 'tobevalidated'),
                validated: m.validated,
                locationRef: m.locationRef,
                latitude: m._geoloc[1],
                longitude: m._geoloc[0],
                title: m.title,
                missionRef: (<any>m).missionRef,
                color: m.validated === true ? 'balanced' : (m.validated === false ? 'assertive' : 'royal')
            };
        });
    }

}
