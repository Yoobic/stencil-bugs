import { FormControl } from '@angular/forms';
import { formInputMultiphotosValidatorRequired } from './form-input-multiphotos-validator';
import {reduce, flatten, map} from 'lodash-es';

describe('shared:data-core:validators:form-input-photo', () => {
    let tests = [
        {value: ['image'], required: false, recognition: false, processed: false, valid: true},
        {value: ['image'], required: true, recognition: false, processed: false, valid: true},
        {value: ['image'], required: false, recognition: false, processed: true, valid: true},
        {value: ['image'], required: true, recognition: false, processed: true, valid: true},
        {value: ['image'], required: false, recognition: true, processed: false, valid: false},
        {value: ['image'], required: true, recognition: true, processed: false, valid: false},
        {value: ['image'], required: false, recognition: true, processed: true, valid: true},
        {value: ['image'], required: true, recognition: true, processed: true, valid: true},

        {value: [], required: false, recognition: false, processed: false, valid: false}, //true?
        {value: [], required: true, recognition: false, processed: false, valid: false},
        {value: [], required: false, recognition: false, processed: true, valid: false},
        {value: [], required: true, recognition: false, processed: true, valid: false},
        {value: [], required: false, recognition: true, processed: false, valid: false},
        {value: [], required: true, recognition: true, processed: false, valid: false},
        {value: [], required: false, recognition: true, processed: true, valid: false},
        {value: [], required: true, recognition: true, processed: true, valid: false},

        {value: undefined, required: false, recognition: false, processed: false, valid: false}, //true?
        {value: undefined, required: true, recognition: false, processed: false, valid: false},
        {value: undefined, required: false, recognition: false, processed: true, valid: false}, //true?
        {value: undefined, required: true, recognition: false, processed: true, valid: false},
        {value: undefined, required: false, recognition: true, processed: false, valid: false},
        {value: undefined, required: true, recognition: true, processed: false, valid: false},
        {value: undefined, required: false, recognition: true, processed: true, valid: false}, //true?
        {value: undefined, required: true, recognition: true, processed: true, valid: false}

    ];
    tests.forEach(t => {
        it(`${JSON.stringify(t.value)} and required ${t.required} and image recognition ${t.recognition} and processed ${t.processed} should ${t.valid ? '' : 'not '}be valid`, () => {
            let fc = new FormControl(t.value);
            fc['processed'] = t.processed;
            expect(formInputMultiphotosValidatorRequired({
                required: t.required,
                isImageRecognition: t.recognition
            }, {min: 1} )(fc)).toEqual(t.valid ? null : {FormInputMultiphotosValidator: {valid: false}});
        });
    });
});