import { Injectable, ChangeDetectorRef } from '@angular/core';

import { Translate } from '@shared/translate';
import { Location, IMapping, Xlsx, Condition, Translation, SIMPLE_FIELD_TYPES, Config, Broker, Requestor, Googlemaps, Slide } from '@shared/data-core';
import { IFormField } from '@shared/interfaces';

import { FormDynamicBuilder } from '../form-dynamic-builder/form-dynamic-builder.service';
import { Conditions } from '../conditions/conditions.service';

import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { forEach, find, findIndex, indexOf, filter, trimEnd, trimStart } from 'lodash-es';

@Injectable()
export class Mapping {
    constructor(private rq: Requestor, private googlemaps: Googlemaps, private broker: Broker, private conditionsService: Conditions, private config: Config, private translate: Translate) { }

    getTotal(mapping: IMapping, xlsx: Xlsx) {
        if (mapping.document) {
            return xlsx.read(mapping.document).then((data: any) => {
                return data.length - 1;
            });
        } else {
            return Promise.resolve(0);
        }
    }

    convertMissionForExcelExport(slides: Array<any>, conditions: Array<any>) {
        let conditionsData = this.convertConditonsForExcelExport(conditions);
        let slidesData = this.convertSlidesForExcelExport(slides);
        return [slidesData, conditionsData];
    }

    convertSlidesForExcelExport(slides: Array<any>) {
        let columns = [{ name: 'id' }, { name: 'pageTitle' }, { name: 'pageDescription' }, { name: 'title' },
        { name: 'description' }, { name: 'type' }, { name: 'allowComments' }, { name: 'required' },
        { name: 'values' }, { name: 'allowLibrary' }, { name: 'min' }, { name: 'max' },
        { name: 'step' }, { name: 'minDate' }, { name: 'maxDate' }, { name: 'hideMobile' },
        { name: 'allowHistory' }, { name: 'showOnLocation' }, { name: 'allowAnnotate' }, { name: 'showUsers' },
        { name: 'showService' }, { name: 'allowOther' }, { name: 'radius' }, { name: 'multiple' },
        { name: 'clearable' }, { name: 'duration' }, { name: 'anwser' }, { name: 'explanation' },
        { name: 'conditions' }, { name: 'allowTime' }, { name: 'image' }
        ];
        let data = [];
        //let counter = 1;
        forEach(slides, function (slide) {
            forEach(slide.items, function (field: any) {
                data.push({
                    id: field.name,
                    pageTitle: slide.title,
                    pageDescription: slide.description,
                    title: field.title,
                    description: field.type === 'information' ? field.value : field.description,
                    type: field.type,
                    allowComments: field.allowComments,
                    required: field.required,
                    values: field.values,
                    allowLibrary: field.allowLibrary,
                    min: field.min,
                    max: field.max,
                    step: field.step,
                    minDate: field.minDate,
                    maxDate: field.maxDate,
                    hideMobile: field.hideMobile,
                    allowHistory: field.allowHistory,
                    showOnLocation: field.showOnLocation,
                    allowAnnotate: field.allowAnnotate,
                    showUsers: field.showUsers,
                    showService: field.showService,
                    allowOther: field.allowOther,
                    radius: field.radius,
                    multiple: field.multiple,
                    clearable: field.clearable,
                    duration: field.duration,
                    anwser: field.anwser,
                    explanation: field.explanation,
                    conditions: field.condition ? field.condition.map(c => c.title) : '',
                    allowTime: field.allowTime,
                    image: field.image
                });
            });
        });
        return { columns: columns, data: data, title: 'Slides' };
    }

    convertConditonsForExcelExport(conditions: Array<any>) {
        let columns = [
            { name: 'title' },
            { name: 'type' },
            { name: 'field' },
            { name: 'operator' },
            { name: 'values' },
            { name: 'id' }
        ];
        let data = [];
        forEach(conditions, function (condition) {
            data.push({
                title: condition.title,
                type: condition.type,
                field: condition.field ? condition.field.name : '',
                operator: condition.operator,
                values: condition.values || condition.value || condition.tags || condition.group,
                id: condition._id
            });
        });
        return { columns: columns, data: data, title: 'Conditions' };
    }

    upload(mapping: IMapping) {
        return this.rq.postFile(this.config.mappingUrl + mapping.type, mapping.document);
    }

    convertTranslations(data: Array<Array<any>>) {
        data.shift();
        let translations = [];
        forEach(data, (row, i) => {
            if (row[1]) {
                let translation: Translation = {
                    language: row[1],
                    key: row[2],
                    value: row[3],
                    en: row[4],
                    us: row[5],
                    fr: row[6],
                    es: row[7],
                    pl: row[8],
                    nl: row[9],
                    de: row[10],
                    it: row[11],
                    ru: row[12],
                    zhs: row[13],
                    zht: row[14],
                    pt: row[15],
                    kr: row[16],
                    ja: row[17],
                    ua: row[18],
                    he: row[19],
                    ar: row[20],
                    cz: row[21],
                    th: row[22],
                    tr: row[23],
                    bg: row[24],
                    el: row[25],
                    sl: row[26],
                    sk: row[27],
                    isReject: this.isTrue(row[28]),
                    group: this._stringToArray(row[29]),
                    isPhotoAnnotation: this.isTrue(row[30])
                };
                if (row[0]) {
                    translation._id = row[0];
                }
                translations.push(translation);
            }
        });
        return translations;
    }

    convertLocations(data: Array<Array<any>>, progress: { count: number; total: number }, cd: ChangeDetectorRef) { //: Observable<Array<Location>>
        data.shift();
        progress.total = data.length;
        let typeNames: Array<string> = [];
        data.forEach(row => {
            if (typeNames.indexOf(row[2]) < 0) {
                typeNames.push(row[2]);
            }
        });

        return this.broker.getAll('locationtypes', null, null, null, [[{ field: 'name', operator: { _id: 'inq' }, value: typeNames }]]).pipe(
            map(res => res.data),
            mergeMap((types: Array<any>) => {
                let obs: Array<Observable<Location>> = [];
                data.forEach((row, index) => {
                    if (row[0] && row[1]) {
                        let location = new Location();
                        location.title = row[0];
                        location.address = row[1];
                        location.placesearch = row[4] ? row[4] : location.title; // + ' ' + location.address;
                        location.contactname = row[5];
                        location.contactemail = row[6];
                        location.contactphone = row[7];
                        location.info = row[8];
                        location.tags = this._stringToArray(row[9]);
                        location.notificationemail = row[10];
                        location.clientid = row[11];
                        if (row[12]) {
                            location._id = row[12];
                        } else {
                            location._id = 'mapping_' + index;
                        }
                        if (row[13]) {
                            location.vip = this.isTrue(row[13]);
                        }
                        location.type = types.find(t => t.name === row[2]);
                        if (row[14]) {
                            location.missiondescriptionsRef = this._stringToArray(row[14]);
                        }
                        if (!row[3]) {
                            let o = this.googlemaps.resolveAddressLocation(location.address, this.translate.getCurrentLanguage(), location.placesearch).pipe(
                                map(value => {
                                    if (value && value.coords) {
                                        location.status = value.source;
                                        location._geoloc = [value.coords.lng, value.coords.lat];
                                    } else {
                                        location.status = 'error';
                                    }
                                    progress.count += 1;
                                    cd.markForCheck();
                                    return location;
                                }));
                            obs.push(o);
                        } else {
                            location._geoloc = JSON.parse(row[3]);
                            location.status = 'file';
                            progress.count += 1;
                            cd.markForCheck();
                            obs.push(of(location));
                        }
                    }
                });
                return forkJoin(obs);
            }));
    }

    convertFormAndConditions(data: Array<Array<Array<any>>>, formDynamicBuilder: FormDynamicBuilder): { slides: Array<Slide>, conditions: Array<Condition>, errors: Array<any> } {
        let convertError = [];
        let slides = <Array<Slide>>[];
        let conditions = [];
        let fieldsDef = this.removeEmptyRows(data[0]);
        let conditionsDef = data.length >= 2 ? this.removeEmptyRows(data[1]) : [];
        fieldsDef.shift();
        conditionsDef.shift();
        let currentSlide = <Slide>{};
        let fields = new Map<string, IFormField>();
        let conditionedFields = new Map<string, { conditions: Array<any>, slideId: number }>();
        fieldsDef.forEach(row => {
            if (row[1] && currentSlide.title !== row[1]) {
                currentSlide = <Slide>{ title: row[1], description: row[2], items: [] };
                slides.push(currentSlide);
            }
            if (currentSlide) {
                if (row[5]) {
                    let f = this.createField(row, formDynamicBuilder);
                    if (row[28]) {
                        let conditionsTitles = this._stringToArray(row[28]);
                        if (conditionsTitles.length > 0) {
                            let cara = {
                                conditions: conditionsTitles,
                                slideId: slides.length - 1
                            };
                            conditionedFields.set(f.name, cara);
                        }
                    }
                    currentSlide.items.push(f);
                    fields.set(row[0], f);
                }
            }
        });
        conditionsDef.forEach(condition => {
            let c = this.createCondition(condition, fields);
            if (this.conditionsService.isValid(c)) {
                conditions.push(c);
            } else {
                convertError.push('CONVERTCONDITIONERROR : ' + condition[0]);
            }
        });
        conditionedFields.forEach((value, key) => {
            let i = findIndex(slides[value.slideId].items, (f: IFormField) => f.name === key);
            if (i >= 0) {
                slides[value.slideId].items[i].condition = [];
                value.conditions.forEach(title => {
                    let cond = find(conditions, (c) => c.title === title);
                    if (cond) {
                        (<Array<Condition>>slides[value.slideId].items[i].condition).push(cond);
                    }
                });
            }
        });
        return { slides: slides, conditions: conditions, errors: convertError };
    }

    private createField(row: Array<any>, formDynamicBuilder: FormDynamicBuilder): IFormField {
        let field = <IFormField>{
            name: row[0] || formDynamicBuilder.generateFieldName(),
            type: <string>row[5].toLowerCase(),
            title: row[3],
            description: row[4],
            allowComments: this.isTrue(row[6]),
            required: this.isTrue(row[7]),
            values: this._stringToArray(row[8]),
            allowLibrary: this.isTrue(row[9]),
            min: row[10],
            max: row[11],
            step: row[12],
            minDate: row[13],
            maxDate: row[14],
            hideMobile: this.isTrue(row[15]),
            allowHistory: this.isTrue(row[16]),
            showOnLocation: this.isTrue(row[17]),
            allowAnnotate: this.isTrue(row[18]),
            showUsers: this.isTrue(row[19]),
            showService: this.isTrue(row[20]),
            allowOther: this.isTrue(row[21]),
            radius: row[22],
            multiple: this.isTrue(row[23]),
            clearable: this.isTrue(row[24]),
            duration: row[25],
            anwser: this._stringToArray(row[26]),
            explanation: row[27],
            allowTime: this.isTrue(row[29])
        };
        if (row[30] && field.type === 'image') {
            field.image = { _downloadURL: row[30] };
        }
        if (field.type === 'information') {
            field.value = field.description;
            delete field.description;
        }
        return field;
    }

    private createCondition(row: Array<any>, fields: Map<string, IFormField>) {
        let c = <Condition>{
            title: row[0]
        };
        c.operator = this.conditionsService.convertOperator(row[3]);
        c.type = this.conditionsService.convertType(row[1]);
        if (row[5]) {
            c._id = row[5];
        }
        if (c.type === 'field') {
            c.field = this.conditionsService.convertField(fields.get(row[2]));
            if (!c.field) {
                return;
            }
            if (indexOf(SIMPLE_FIELD_TYPES, c.field.type) >= 0) {
                c.value = row[4];
            } else {
                c.values = this._stringToArray(row[4]);
            }
        } else if (c.type === 'tags') {
            c.tags = this._stringToArray(row[4]);
        } else if (c.type === 'groups') {
            c.group = this._stringToArray(row[4]);
        } else {
            return;
        }
        return c;
    }

    private removeEmptyRows(array: Array<Array<string>>): Array<Array<string>> {
        return filter(array, (row) => {
            return filter(row, v => v && !!v.replace(/\s/g, '')).length > 0;
        });
    }

    private _stringToArray = function (str) {
        let array = str ? trimEnd(trimStart(str, '['), ']').split(',') : [];
        for (let i = 0; i < array.length; i++) {
            if (/^\s/.test(array[i])) {
                array[i] = array[i].substring(1);
            }
        }
        return array;
    };

    private isTrue(str) {
        return str === 'TRUE' || str === 'VRAI' || str === 'true' || str === 'vrai';
    }
}
