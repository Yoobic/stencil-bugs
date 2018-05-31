import { Injectable } from '@angular/core';
import { Config, Requestor, Models, Broker } from '@shared/data-core';

import { CustomModel } from '../../interfaces/custom-model/custom-model.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomModels {

    constructor(protected config: Config, protected rq: Requestor, protected broker: Broker) { }

    registerModel(name: string, customModel: CustomModel): Observable<any> {
        let properties = customModel.fields.map(field => {
            let retVal = {};
            retVal[field.name] = {
                type: 'string'
            };
            return retVal;
        });
        properties.unshift({
            '_id': <any>{
                'type': 'string',
                'id': true,
                'generated': true
            }
        });
        customModel.properties = properties;
        customModel.permissions = 'private';
        return this.broker.upsert('custommodels', customModel).pipe(map(() => {
            this.registerModelForClient(customModel);
        }));
    }

    registerModelForClient(customModel: CustomModel) {
        Models.clearCollectionName(customModel.name);
        Models.setCollectionName(customModel.name, customModel.name, ['*'], [], null, customModel.feathersService, CustomModel, true);
        if (customModel.fields) {
            customModel.fields.forEach(field => {
                if (field) {
                    Models.addFormField(customModel.name, field);
                    if (field.searchable) {
                        Models.addSearchableField(customModel.name, field.name);
                    }
                }
            });
        }
        if (customModel.appearance) {
            for (let key in customModel.appearance) {
                if (customModel.appearance.hasOwnProperty(key)) {
                    Models.addAppearance(customModel.name, key, customModel.appearance[key]);
                }
            }
        }
    }

    registerModelsForClient() {
        this.broker.getAll('custommodels', null, null, null, null, null, null, 10000).subscribe(ret => {
            if (ret.data) {
                ret.data.forEach((customModel: CustomModel) => {
                    this.registerModelForClient(customModel);
                });
            }
        });
    }

}
