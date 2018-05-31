import { emailValidator } from './email.validator';

describe('Stencil Email Validator ', () => {

    let results = [
        {email: 'aze', result: false},
        {email: 'bonjour', result: false},
        {email: '@ks', result: false},
        {email: 'aazerty.com', result: false},
        {email: '', result: false},
        {email: 'macing@gmail', result: false},
        {email: 'slubineau@yoobic.com', result: true},
        {email: 'yoobic@gmail.com', result: true},
        {email: 'yoobic@laposte.net', result: true},
        {email: 'yoobic@yahoo.com', result: true},
        {email: 'yoobic@gmail.fr', result: true},
        {email: 'yoobic@someone.www', result: true}
    ];

    results.forEach(i => {
        it(`value: ${i.email} should ${i.result ? 'success' : 'fail'} `, () => {
            expect(emailValidator(i.email)).toEqual(i.result);
        });
    });
});