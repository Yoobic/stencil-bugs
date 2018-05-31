import { FormControl } from '@angular/forms';

import { formFilterFieldValidatorRequired } from './form-filter-field-validator';

describe('shared:data-core:validators:form-filter-field', () => {
    const current = [{name: 'test'}];
    let tests = [
        {value: [1, 10], operator: {_id: 'between'}, valid: true},
        {value: 1, operator: undefined, valid: false},
        {value: 1, operator: {_id: 'another'}, valid: true},
        {value: [1, 10], operator: {_id: 'another'}, valid: true},
        {value: 'a', operator: {_id: 'between'}, valid: false},
        {value: 'a', operator: {_id: 'another'}, valid: true},
        {value: 0, operator: {_id: 'another'}, valid: true}
    ];
    tests.forEach(t => {
        it(`${JSON.stringify(t.value)} and ${JSON.stringify(t.operator)} should ${t.valid ? '' : 'not '}be valid`, () => {            expect(formFilterFieldValidatorRequired()(
                new FormControl({value: t.value, operator: t.operator})
            ))
                .toEqual(t.valid ? null : {formFilterFieldValidator: {valid: false}});
        });
    });
});