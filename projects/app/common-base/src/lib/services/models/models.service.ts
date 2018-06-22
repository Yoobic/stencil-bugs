import { Injectable, Type } from '@angular/core';
import { IModel } from './model.interface';

import { isString } from 'lodash-es';

/** @name Models
 * @angularType service
 * @description A powerful service which gets the model for a collection or class. The model could include form fields, searchable fields and mapping fields which are useful for generating forms or filters related to the collection or class.
 */
@Injectable()
export class Models {
    private static _models = new Map<string, IModel>();


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

    public static getFieldsFromSlides(slides: Array<any>, types: Array<string> = [], excludedTypes: Array<string> = []) {
        let fields: Array< any> = [];
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
}

