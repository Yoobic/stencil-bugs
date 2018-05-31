import { FormControl } from '@angular/forms';

import { formInputMissionfieldValidatorRequired  } from './form-input-missionfield-validator';

describe('shared:data-core:validators:form-input-missionfield', () => {
    const fields = [{name: 'test'}];
    let tests = [
        {description: 'test', fields, valid: true},
        {description: undefined, fields, valid: false},
        {description: 'test', fields: undefined, valid: false},
        {description: 'test', fields, valid: true},
        {description: 'test', fields: [], valid: true}
    ];
    tests.forEach(t => {
        it(`description: ${JSON.stringify(t.description)} and fields: ${JSON.stringify(t.fields)} should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputMissionfieldValidatorRequired()(
                new FormControl({selectedDescription: t.description, fields: t.fields})
            ))
                .toEqual(t.valid ? null : {FormInputMissionfieldValidator: {valid: false}});
        });
    });
});
