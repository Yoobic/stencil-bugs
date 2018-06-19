import { Entity } from '../../interfaces/entity/entity.interface';
import { Models } from '../../services/models/models.service';

export interface IModelConfig {
    collectionName?: string;
    className: string;
    fields?: Array<string>;
    include?: any;
    searchSubquery?: { collectionName: string; field: string; values: string };
    feathersService?: string;
    detailComponent?: string;
}

export function Model(config: IModelConfig) {
    return function (target: typeof Entity) {
        if (Models) {
            Models.setCollectionName(config.className, config.collectionName, config.fields, config.include, config.searchSubquery, config.feathersService, target);
        }
    };
}

export function ModelExtended(config: { baseClass: string, extendedClass: string }) {
    return function (target: any) {
        Models.addBaseModel(config.extendedClass, config.baseClass, target);
    };
}
