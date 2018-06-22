import { Injectable } from '@angular/core';

export interface FieldControl {
    [key: string]: any;
}

@Injectable()
export class FormDynamicBuilder {
    constructor() { }

    hasTabs(formDefinition: Array<any>) {
        return formDefinition.some(f => f.tab && f.tab.length > 0);
    }

    getTabName(field: any) {
        let retVal = '';
        if (field.tabIndex) {
            retVal += field.tabIndex + '. ';
        }
        if (field.tab) {
            retVal += field.tab;
        }
        return retVal;
    }

    }
