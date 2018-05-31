import { Injectable } from '@angular/core';
import { ResponseObject, MissionDescription, Models, Slide } from '@shared/data-core';
import { IFormField, FormFieldType } from '@shared/interfaces';
import { MISSION_STATUS } from '../../interfaces/mission/mission.interface';
import { MissionStatusRendererComponent } from '@shared/data-form';

import { cloneDeep, uniq, concat, forEach } from 'lodash-es';

@Injectable()
export class Missiondescriptions {
    /*
        Return the transform to extract the fields from a mission description
    */
    static getFieldTransform(types: Array<string> = []): (res: ResponseObject) => ResponseObject {
        return Models.getFieldTransform(types);
    }

    /*
        Return the list of slide items fields from a mission description (mobile type)
    */
    static getFields(missiondescription: MissionDescription, types: Array<string> = [], excludedTypes: Array<string> = []) {
        return Models.getFields(missiondescription, types, excludedTypes);
    }

    /*
        Return the list of slide items fields from an array of slides (mobile type)
    */
    static getFieldsFromSlides(slides: Array<Slide>, types: Array<string> = [], excludedTypes: Array<string> = []) {
        return Models.getFieldsFromSlides(slides, types, excludedTypes);
    }

    /*
        Return the list of form field from a mission description. Used in the mission data grid and form
    */
    public static getFormFields(missiondescription: MissionDescription, translate, includeComments = false): Array<IFormField> {
        let mobileFields = Models.getFields(missiondescription, null, ['information']);
        mobileFields = mobileFields.reduce((previous: Array<IFormField>, current: IFormField) => {
            let retVal = cloneDeep(current);
            retVal.name += '.value';
            retVal.operators = Models.getFieldOperator(current);
            //retVal.type = Models.getFormFieldFromMobileField(retVal.type);
            previous.push(retVal);

            if (current.allowComments && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .C';
                retVal.name += '.comments';
                retVal.type = 'text';
                previous.push(retVal);
            }

            if (current.allowTime && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .T';
                retVal.name += '.time';
                retVal.type = 'time';
                previous.push(retVal);
            }
            return previous;
        }, []);
        if (missiondescription.type === 'service') {
            mobileFields.unshift({ name: 'mission.status', title: 'STATUS', type: FormFieldType.autocomplete, translate: true, values: uniq(concat(MISSION_STATUS, [undefined])), handleUndefined: true, cellRenderer: MissionStatusRendererComponent.simpleRenderer(translate) });
            mobileFields.unshift({ name: 'mission.creatorDisplayName', title: 'REQUESTOR' });
            mobileFields.unshift({ name: 'mission._ect', title: 'CREATIONDATE', type: FormFieldType.datetime });
        }
        if (missiondescription.scoring && missiondescription.scoring.length > 0) {
            forEach(missiondescription.scoring, (scoring) => {
                if (scoring.isActive !== true) {
                    mobileFields.unshift({ name: 'extraScores.' + scoring.title + '.value', title: scoring.title, type: 'number' });
                } else {
                    mobileFields.unshift({ name: 'score.value', title: scoring.title, type: 'number' });
                }
            });
        }
        return mobileFields;
    }

    static encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        } else {
            return v;
        }
    }
}
