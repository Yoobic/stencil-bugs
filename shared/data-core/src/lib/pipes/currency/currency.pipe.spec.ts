import { CurrencyPipe } from './currency.pipe';
import { Session } from '../../services/session/session.service';
import { Translate } from '@shared/translate';

describe('pipe: CurrencyPipe', () => {

    const CURRENCIES = [
        {
            'rate' : 1.0,
            'currency' : 'fr',
            'symbol' : '€'
        }, {
            'rate' : 0.85,
            'currency' : 'en',
            'symbol' : '£'
        }, {
            'rate' : 1.05,
            'currency' : 'us',
            'symbol' : '$'
        }, {
            'rate' : 1.0,
            'currency' : 'es',
            'symbol' : '€'
        }, {
            'rate' : 4.3,
            'currency' : 'pl',
            'symbol' : 'zł'
        },  {
            'rate' : 7.2,
            'currency' : 'zht',
            'symbol' : '¥'
        }, {
            'rate' : 3.8,
            'currency' : 'he',
            'symbol' : '₪'
    }].map (i =>  Object.assign(i, {_id: null, _acl: null}));

    let mockTranslate: Translate;
    let mockSession: Session;
    let currencyPipe: CurrencyPipe;

    let pi: number = 3.14156;
    let little: number = -0.12345;
    let rules = [
        {currency: '$', locale: 'en-US'},
        {currency: '€', locale: 'fr-FR'},
        {currency: '£', locale: 'en-GB'},
        {currency: '₪', locale: 'he-IL'}
    ];

    beforeEach( () => {
        mockTranslate = new Translate(null, null, null);
        mockSession = new Session(null);
        mockSession.currencies = CURRENCIES;
        currencyPipe = new CurrencyPipe(mockTranslate, mockSession);
    });

    rules.forEach ( i => {
        it(`show currency for  ${i.currency}, locale: ${i.locale}`, () => {
            mockTranslate.get = jest.fn(() => i.currency);
            mockTranslate.getCurrentAngularLocale = jest.fn(() => i.locale);
            expect(currencyPipe.transform(pi)).toMatchSnapshot();
            expect(currencyPipe.transform(pi, '1')).toMatchSnapshot();

            expect(currencyPipe.transform(little)).toMatchSnapshot();

            expect(currencyPipe.transform(little, '1')).toMatchSnapshot();

        });

    });

    it ('should return empty if no value', () => {
        mockTranslate.get = jest.fn(() => '€');
        mockTranslate.getCurrentAngularLocale = jest.fn(() => 'en-US');
        expect(currencyPipe.transform(undefined)).toEqual('');

    });
});