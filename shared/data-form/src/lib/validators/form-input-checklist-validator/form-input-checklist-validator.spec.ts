import { FormControl } from '@angular/forms';

import { formInputChecklistValidatorRequired } from './form-input-checklist-validator';

describe('shared:data-core:validators:form-input-checklist', () => {
    const current = [{name: 'test'}];
    let tests = [
        {current, valid: true},
        {current, previous: [], valid: true},
        {current, previous: 'a', valid: true},
        {current, previous: {}, valid: true},
        {current, previous: undefined, valid: true},
        {current, previous: [ {validated: null}], valid: false},
        {current, previous: [ {validated: true}, {validated: false}], valid: true},
        {current, previous: [ {validated: 'abc'}, {validated: false}], valid: false},
        {current: [], valid: false},
        {current: [], previous: [ {validated: true}], valid: false},
        {current: [], previous: [ {validated: null}], valid: false}
    ];
    tests.forEach(t => {
        it(`current tasks: ${JSON.stringify(t.current)} and previous tasks: ${JSON.stringify(t.previous)} should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputChecklistValidatorRequired()(
                new FormControl({previousTasks: t.previous, currentTasks: t.current})
            ))
                .toEqual(t.valid ? null : {formInputChecklistValidator: {valid: false}});
        });
    });
});
