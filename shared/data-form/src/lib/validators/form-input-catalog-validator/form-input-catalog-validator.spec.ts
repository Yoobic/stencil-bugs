import { FormControl } from '@angular/forms';

import { formInputCatalogValidatorRequired } from './form-input-catalog-validator';

describe('shared:data-core:validators:form-input-catalog', () => {
    let tests = [
        {value: { 111: 1, 121: 1}, valid: true},
        {value: { 111: 0, 121: 0}, valid: false},
        {value: { 111: -1, 121: 2}, valid: true}, //problem!
        {value: 'a', valid: false},
        {value: {}, valid: false}
    ];
    tests.forEach(t => {
        it(`${JSON.stringify(t.value)} with should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputCatalogValidatorRequired()(new FormControl(t.value)))
                .toEqual(t.valid ? null : {formInputCatalogValidator: {valid: false}});
        });
    });
});