import { Injectable, Type } from '@angular/core';
import { isPresent } from '@shared/common';
import { Filters, FilterField, FilterOperator, SubQuery, IFormField, MOBILE_FORM_FIELDS_ALL, FormFieldType, moment } from '@shared/interfaces';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { IModel } from '../../interfaces/model/model.interface';
import { ROLES_CONDITIONS } from '../../interfaces/condition/icondition.interface';

import { cloneDeep, compact, uniq, union, isArray, isObject, isString, map, pull, assign, isEmpty, get } from 'lodash-es';

/** @name Models
 * @angularType service
 * @description A powerful service which gets the model for a collection or class. The model could include form fields, searchable fields and mapping fields which are useful for generating forms or filters related to the collection or class.
 */
@Injectable()
export class Models {
    private static _models = new Map<string, IModel>();

    public static addSearchableField(className: string, fieldName: string) {
        let model = this.createOrGetModel(className);
        model.searchableFields.push(fieldName);
        this.updateModel(className, model);
    }

    public static addMappingField(className: string, fieldName: string, order: number) {
        let model = this.createOrGetModel(className);
        model.mappingFields.set(order, fieldName);
        this.updateModel(className, model);
    }

    public static addAppearance(className: string, entityListItemProperty: string, appareance: any) {
        let model = this.createOrGetModel(className);
        model.appareance.set(entityListItemProperty, appareance);
        this.updateModel(className, model);
    }

    public static addFormField(className: string, field: IFormField) {
        let model = this.createOrGetModel(className);
        let formFields = model.formFields;
        formFields = formFields.filter(f => f.name !== field.name);
        formFields.push(field);
        model.formFields = formFields;
        this.updateModel(className, model);
    }

    public static addBaseModel(className: string, baseClassName: string, target) {
        let model = this.createOrGetModel(className);
        let base = this.createOrGetModel(baseClassName);
        let formFields = model.formFields || [];

        let baseFields = [];
        if (base.formFields) {
            base.formFields.map(field => {
                if (formFields.findIndex(f => f.name === field.name) < 0) {
                    baseFields.push(cloneDeep(field));
                }
            });
        }

        model.formFields = compact(union(baseFields, formFields));
        model.searchableFields = uniq(union(cloneDeep(base.searchableFields), model.searchableFields));
        model.type = target;
        this.updateModel(className, model);
    }

    public static setCollectionName(className: string, collectionName: string, fields: any, include: any, searchSubquery: any, feathersService: string, target: any, isCustom?: boolean) {
        let model = this.createOrGetModel(className);
        model.collectionName = collectionName;
        model.fields = fields;
        model.include = include;
        model.searchSubquery = searchSubquery;
        model.type = target;
        model.feathersService = feathersService;
        model.isCustom = isCustom;
        this.updateModel(className, model);
    }

    public static clearCollectionName(className: string) {
        Models._models.delete(className);
    }

    public static getModel(className: string | Type<any>): IModel {
        let retVal;
        if (isString(className) === true) {
            retVal = this.createOrGetModel(<string>className);
        } else {
            Models._models.forEach((m) => {
                if (m.type && m.type === className) {
                    retVal = m;
                }
            });
        }
        return retVal;
    }

    public static getModelByCollectionName(collectionName: string): IModel {
        let model;
        Models._models.forEach((m) => {
            if (m.collectionName === collectionName) {
                model = m;
            }
        });
        if (!model && collectionName && collectionName.endsWith('_store')) {
            let name = collectionName.replace('_store', '');
            if (name === 'missiondescription') {
                name += 's';
            }
            return Models.getModelByCollectionName(name);
        }
        return model;
    }

    public static getFieldName(field: IFormField) {
        let fieldName = field.name + ((field.columnDefinition && field.columnDefinition.name) ? ('.' + field.columnDefinition.name) : '');
        if (field.columnDefinition && field.columnDefinition.forceName) {
            fieldName = field.columnDefinition.name;
        }
        return fieldName;
    }

    public static getFieldTitle(field: IFormField, translate: any) {
        let fieldTitle = field.title || field.name;
        fieldTitle = translate.polyglot(fieldTitle);
        return fieldTitle;
    }

    public static isBooleanField(field: IFormField) {
        return field.type === FormFieldType.checkbox || field.type === FormFieldType.toggle;
    }

    public static isNumberField(field: IFormField) {
        return field.type === FormFieldType.number || field.type === FormFieldType.range || field.type === FormFieldType.starrating;
    }

    public static isPhotoField(field: IFormField) {
        return field.type === FormFieldType.photo || field.type === FormFieldType.signature || (field.type === FormFieldType.autocomplete && field.collectionName === 'files');
    }

    public static isMultiPhotosField(field: IFormField) {
        return field.type === FormFieldType.multiphotos;
    }

    public static isPhotoOrMultiPhotosField(field: IFormField) {
        return Models.isPhotoField(field) || Models.isMultiPhotosField(field);
    }

    public static isVideoField(field: IFormField) {
        return field.type === FormFieldType.video;
    }

    public static isDateTimeField(field: IFormField) {
        return field.type === FormFieldType.date || field.type === FormFieldType.datetime;
    }

    public static isIntervalField(field: IFormField) {
        return field.type === FormFieldType.number || field.type === FormFieldType.starrating || field.type === FormFieldType.date || field.type === FormFieldType.datetime || field.type === FormFieldType.time;
    }

    public static isChartableAutoFieldNoPhoto(field: IFormField) {
        return Models.isChartableAutoField(field, false);
    }

    public static isChartableAutoField(field: IFormField, includePhoto = true) {
        switch (field.type) {
            case FormFieldType.checkbox:
            case FormFieldType.toggle:

            case FormFieldType.select:
            case FormFieldType.selectmulti:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.starrating:
            case FormFieldType.number:
            case FormFieldType.range:
            case FormFieldType.ranking:
            case FormFieldType.formula:
                return true;
            case FormFieldType.photo:
            case FormFieldType.multiphotos:
                return includePhoto;

            case FormFieldType.autocomplete:
                return !field.collectionName || Models.getModel(field.collectionName).isCustom !== true;

        }
        return false;
    }

    public static isMultipleField(field: IFormField) {
        switch (field.type) {
            case FormFieldType.selectmulti:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.ranking:
                return true;

            case FormFieldType.autocomplete:
                return field.multiple === true;
        }
        return false;
    }

    public static isColoredField(field: IFormField) {
        switch (field.type) {
            case FormFieldType.select:
            case FormFieldType.selectmulti:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
                return true;
        }
        return false;
    }

    public static getFieldOperator(field: IFormField): Array<FilterOperator> {
        if (field.type === 'fieldselector') {
            return [{ title: 'in', _id: 'inq' }];
        } else if (Models.isBooleanField(field)) {
            return [
                { title: 'equals', _id: 'eq' },
                { title: 'notequals', _id: 'neq' }
            ];
        } else if (Models.isPhotoField(field)) {
            return [
                { title: 'exists', _id: 'exists' }
            ];
        } else if (Models.isIntervalField(field) || Models.isDateTimeField(field)) {
            return [
                { title: 'greaterthan', _id: 'gte', interval: true },
                { title: 'between', _id: 'between', interval: true },
                { title: 'lessthan', _id: 'lte', interval: true },
                { title: 'equals', _id: 'eq', interval: true }
            ];
        } else if (field.type === FormFieldType.autocomplete || field.type === FormFieldType.location) {
            return [
                { title: 'in', _id: 'inq' },
                { title: 'notin', _id: 'nin' },
                { title: 'all', _id: 'all' }
            ];
        } else {
            return [
                { title: 'like', _id: 'like' },
                { title: 'notlike', _id: 'nlike' },
                { title: 'equals', _id: 'eq' },
                { title: 'notequals', _id: 'neq' }
            ];
        }
    }

    // public static getFormFieldFromMobileField(type) {
    //     switch (type) {
    //         case FormFieldType.photo:
    //         case FormFieldType.signature:
    //         case FormFieldType.image:
    //         case FormFieldType.barcode:
    //         case FormFieldType.video:
    //         case FormFieldType.audio:
    //         case FormFieldType.document:
    //             return FormFieldType.photo;
    //         case FormFieldType.date:
    //             return FormFieldType.date;
    //         default:
    //             return FormFieldType[type] || FormFieldType.text;
    //     }
    // }

    public static getMobileFieldIcon(type: string) {
        let fields = [].concat(MOBILE_FORM_FIELDS_ALL).filter(field => field.type === type);
        if (fields && fields.length > 0) {
            return fields[0].icon;
        }
        return '';
    }

    public static exportWhere(collectionName: string, filters?: Filters, excludedFields = []) {
        let retVal = filters.map(fs => {
            let simplifiedFilters = [];
            fs.forEach(f => {
                if ((!f.subQuery || f.collectionName === collectionName) && (!excludedFields || excludedFields.indexOf(f.field) < 0)) { //&& !f.isFieldSelector
                    let filter = Models.exportFilterField(f);
                    simplifiedFilters.push(filter);
                }
            });
            if (simplifiedFilters.length === 0) {
                return null;
            } else if (simplifiedFilters.length === 1) {
                return simplifiedFilters[0];
            } else {
                return { 'and': simplifiedFilters };
            }
        });

        if (retVal) {
            pull(retVal, null);
        }

        if (retVal && retVal.length === 1) {
            return retVal[0];
        } else if (retVal && retVal.length > 0) {
            return { 'or': retVal };
        }
        return null;
    }

    public static exportSubQuery(collectionName: string, filters?: Filters | Object): SubQuery | Array<SubQuery> {
        let retVal: Array<SubQuery> = [];
        if (filters && isArray(filters) && (<Filters>filters).length > 0) {
            (<Filters>filters).forEach(fs => {
                fs.forEach(f => {
                    if (f.subQuery && f.collectionName !== collectionName) {
                        retVal.push({ collectionName: this.fixCollectionName(f.collectionName), where: Models.exportFilterField(f), field: f.subQuery.field, values: f.subQuery.values });
                    }
                });

            });
        }
        return retVal.length === 1 ? retVal[0] : (retVal.length > 1 ? retVal : null);
    }

    public static exportSearch(collectionName: string, search: string): any {
        let retVal = Models.getModelByCollectionName(collectionName).searchableFields.map(field => {
            let filter = {};
            if (field === '_id' && collectionName !== 'groups') {
                filter[field] = search;
            } else {
                filter[field] = { 'like': search, 'options': 'i' };
            }
            return filter;
        });
        if (retVal.length === 1) {
            return retVal[0];
        } else if (retVal.length > 0) {
            return { 'or': retVal };
        }
        return null;
        //return { '$text': { 'search': search } };
    }

    public static fixCollectionName(collectionName: string) {
        switch (collectionName) {
            // case 'missiondescriptions':
            //     return 'missiondescription';
            // case 'groups':
            //     return 'group';
            case 'users':
                return 'user';
            default:
                return collectionName;
        }
    }

    public static getPhotoFromParams(params) {
        if (params && params.node && params.node.data) {
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            let f = params.colDef.field.replace('.value', '');
            let photo = Models.extractPhoto(row[f], row, {}, f);
            return photo;
        }
        return null;
    }

    // get photos for multiphoto component
    public static getPhotosFromParams(params) {
        if (params && params.node && params.node.data) {
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            let f = params.colDef.field.replace('.value', '');  // field name
            let photos = [];
            if (row && f && row[f] && row[f].value && isArray(row[f].value)) {
                row[f].value.forEach((v, multiIndex) => {
                    photos.push(Models.extractPhoto(v, row, {}, f, FormFieldType.multiphotos, null, multiIndex));
                });
            }
            return photos;
        }
        return null;
    }

    public static getEmptyUrl(collectionName: string) {
        switch (collectionName) {
            case 'dashboards':
            case 'dashboard':
                return 'dashboard.svg';

            case 'missions':
            case 'mission':
                return 'mission.svg';

            case 'missiondescriptions':
            case 'missiondescription':
            case 'campaign':
                return 'campaign.svg';

            case 'photos':
            case 'photo':
                return 'photo.svg';

            case 'feeds':
            case 'feed':
                return 'feed.svg';

            case 'files':
            case 'file':
                return 'file.svg';

            case 'locations':
            case 'location':
                return 'location.svg';

            case 'notes':
            case 'note':
                return 'note.svg';

            case 'users':
            case 'user':
                return 'user.svg';
        }
        return 'empty.svg';
    }

    public static extractPhoto(data, missiondata, field, name, type?: string, hideUser: boolean = false, multiIndex?: number) {
        let photo: any = {};
        if (data || (field && field.type === 'image' && field.image && field.image._downloadURL)) {
            if (data && data.value && data.value.indexOf && data.value.indexOf('http') === 0 && (!type || !data.fieldType || data.fieldType === type)) {
                photo = {
                    value: data.value,
                    comments: data.comments,
                    tags: data.tags,
                    flagged: data.flagged,
                    edit: data.edit,
                    editBy: data.editBy,
                    editWidth: data.editWidth,
                    editHeight: data.editHeight,
                    texts: data.texts
                };

            } else if (data && data.indexOf && data.indexOf('http') === 0) {
                if (type && type === FormFieldType.multiphotos) {
                    let fieldData = get(missiondata, field.name || name);
                    let extraData = fieldData && (<any>fieldData).extraData ? (<any>fieldData).extraData : {};
                    photo = {
                        value: data,
                        tags: extraData[multiIndex] ? extraData[multiIndex].tags : null,
                        flagged: extraData[multiIndex] ? extraData[multiIndex].flagged : null,
                        edit: extraData[multiIndex] ? extraData[multiIndex].edit : null,
                        editBy: extraData[multiIndex] ? extraData[multiIndex].editBy : null,
                        editWidth: extraData[multiIndex] ? extraData[multiIndex].editWidth : null,
                        editHeight: extraData[multiIndex] ? extraData[multiIndex].editHeight : null,
                        texts: extraData[multiIndex] ? extraData[multiIndex].texts : [],
                        isMulti: true
                    };
                } else {
                    photo = { value: data };
                }
            } else if (field && field.type === 'image' && field.image && field.image._downloadURL) {
                photo = {
                    name: field.name || name,
                    title: field.title,
                    value: field.image._downloadURL,
                    isImage: true
                };
            }
            if (!isEmpty(photo)) {
                if (!field || field.type !== 'image') {
                    assign(photo, {
                        title: field.title,
                        name: field.name || name,
                        multiIndex: multiIndex,
                        _id: missiondata._id + ' _' + (field.name || name),
                        missiondescriptionRef: missiondata.missiondescriptionRef,
                        missiondescription: missiondata.missiondescription,
                        missiondata: missiondata,
                        missiondataRef: missiondata._id,
                        mission: missiondata.mission,
                        missionRef: missiondata.missionRef,
                        userRef: missiondata.userRef,
                        userDisplayname: hideUser ? '' : missiondata.userDisplayname,
                        address: missiondata.address,
                        location: missiondata.location,
                        validated: missiondata.validated,
                        _acl: missiondata._acl
                    });
                }

                if (field.isImageRecognition && photo.edit) {
                    photo.value = photo.edit;
                    delete photo.edit;
                }
                return photo;
            }
        }
        return null;
    }

    /*
       Return the transform to extract the fields from a mission description
   */
    public static getFieldTransform(types: Array<string> = []) {
        function getFieldTransformInternal(res: ResponseObject) {
            if (res.data && res.data.forEach) {
                let fields = [];
                res.data.forEach((missiondescription: any) => {
                    let missionFields = Models.getFields(missiondescription, types);
                    missionFields = missionFields.map((field: IFormField) => {
                        return assign(field, {
                            _id: field.name,
                            name: field.name + '.value',
                            operators: Models.getFieldOperator(field),
                            slideTitle: missiondescription.title
                        });
                    });
                    fields = fields.concat(missionFields);
                });
                res.data = fields;
            }
            return res;
        }

        return getFieldTransformInternal;
    }

    /*
        Return the list of slide items fields from a mission description (mobile type)
    */
    public static getFields(missiondescription: any, types: Array<string> = [], excludedTypes: Array<string> = []) {
        return Models.getFieldsFromSlides(missiondescription.slides, types, excludedTypes);
    }

    /*
        Return the list of slide items fields from an array of slides (mobile type)
    */
    public static getFieldsFromSlides(slides: Array<any>, types: Array<string> = [], excludedTypes: Array<string> = []) {
        let fields: Array<IFormField> = [];
        if (slides) {
            slides.forEach((slide, index) => {
                if (slide.items) {
                    slide.items.forEach(item => {
                        item.slideTitle = slide.title;
                        if (!types || types.length === 0 || types.indexOf(item.type) >= 0) {
                            if (!excludedTypes || excludedTypes.length === 0 || excludedTypes.indexOf(item.type) < 0) {
                                item.slideIndex = index;
                                fields.push(item);
                            }
                        }
                    });
                }
            });
        }
        return fields;
    }

    private static exportFilterField(f: FilterField) {
        let filter = {};
        if (f.handleUndefined && isPresent(f.value) && isArray(f.value)) {
            if (f.value.indexOf(undefined) < 0 && f.value.indexOf('undefined') < 0) {
                filter[f.field] = {};
                filter[f.field][f.operator._id] = f.value;
            } else {
                let def = filter;
                def[f.field] = {};
                def[f.field][f.operator._id] = map(f.value, (v) => {
                    return v === undefined || v === 'undefined' ? null : v;
                });
            }
        } else {
            filter[f.field] = {};
            if (f.type === FormFieldType.address && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter[f.field] = { 'nearSphere': { '$geometry': { 'type': 'Point', 'coordinates': f.value && f.value._geoloc ? f.value._geoloc : f.value }, '$maxDistance': f.radius * 1000 || 40000 } };
            } else if (f.operator._id === 'nearSphere' && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter[f.field] = { 'nearSphere': { '$geometry': { 'type': 'Point', 'coordinates': f.value && f.value._geoloc ? f.value._geoloc : f.value }, '$maxDistance': f.max || 40000 } };
            } else if (f.type === FormFieldType.date && f.operator._id === 'eq') {
                filter[f.field]['between'] = [f.value, moment(f.value).add(1, 'days').format('YYYY-MM-DD')];
            } else if (isPresent(f.value)) {
                let value = isArray(f.value) && isObject(f.value[0]) ? map(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
                if (f.operator && f.operator._id === 'eq') {
                    filter[f.field] = value;
                } else {
                    filter[f.field][f.operator._id] = value;
                }
            }
            if (f.operator && (f.operator._id === 'like' || f.operator._id === 'nlike')) {
                filter[f.field].options = 'i';
            }
        }
        return filter;
    }

    private static createOrGetModel(className: string, override?: boolean): IModel {
        Models._models = Models._models || new Map<string, IModel>();
        if (Models._models.has(className) && override !== true) {
            return Models._models.get(className);
        } else {
            let model = new IModel(className);
            Models._models.set(className, model);
            return model;
        }
    }

    private static updateModel(className: string, model: IModel) {
        let formFields = model.formFields || [];
        if (formFields.findIndex(f => f.name === '_tenant') < 0 && model.collectionName) {
            formFields.push({
                required: true,
                name: '_tenant',
                title: 'TENANT',
                type: FormFieldType.autocomplete,
                condition: [ROLES_CONDITIONS.isAdmin],
               collectionName: 'tenants',
                multiple: false,
               columnDefinition: { name: 'name' }
            });
           model.formFields = formFields;
        }
        Models._models.set(className, model);
    }
}
