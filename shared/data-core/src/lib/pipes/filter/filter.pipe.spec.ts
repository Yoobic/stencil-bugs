import { FilterPipe } from './filter.pipe';

import { Translate } from '@shared/translate';

describe('pipes: filterPipe', () => {

    const DATA = [
        { first: 'john', last: 'Doe', status: 'HAPPY_LNG' },
        { first: 'Jane', last: 'Doe', status: 'HAPPY_LNG' },
        { first: 'Jill', last: 'Day', status: 'SAD_LNG' }
    ];

    const LNG = {
        HAPPY_LNG: 'Happy',
        SAD_LNG: 'Sad'
    };

    let filterPipe: FilterPipe;
    let mockTranslate = new Translate(null, null, null);

    beforeEach(() => {
        filterPipe = new FilterPipe(mockTranslate);
    });
    it('should return data if no string to match', () => {
        expect(filterPipe.transform(DATA)).toMatchSnapshot();
    });

    it('should filter data by value', () => {
        expect(filterPipe.transform(DATA, 'john')).toMatchSnapshot();
    });

    it('should be case insensitive', () => {
        expect(filterPipe.transform(DATA, 'JOHN')).toMatchSnapshot();
    });
    it('should limit filter to certain fileds', () => {
        expect(filterPipe.transform(DATA, 'john', ['last', 'status'])).toEqual([]);
    });

    it('should reverse filter', () => {
        expect(filterPipe.transform(DATA, 'john', ['first'], false)).toMatchSnapshot();
    });

    it('should use translated value', () => {
        mockTranslate.get = jest.fn(key => LNG[key] || '');
        expect(filterPipe.transform(DATA, 'Happy', ['status'], true, true)).toMatchSnapshot();
    });

});
