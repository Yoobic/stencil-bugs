import { OrderByPipe } from './order-by.pipe';

describe('Pipe: OrderByPipe', () => {
    let orderByPipe = new OrderByPipe();
    it('should sort an array in ascending order by a specified key', () => {
        let keysArray = ['name'];
        let arrayToSort = [
            { name: 'Bill', age: 45 },
            { name: 'Jill', age: 55 },
            { name: 'Geoff', age: 66 },
            { name: 'Xander', age: 25 },
            { name: 'Sophie', age: 35 },
            { name: 'Britney', age: 35 }
        ];
        expect(orderByPipe.transform(arrayToSort, keysArray)).toEqual([
            { age: 45, name: 'Bill' },
            { age: 35, name: 'Britney' },
            { age: 66, name: 'Geoff' },
            { age: 55, name: 'Jill' },
            { age: 35, name: 'Sophie' },
            { age: 25, name: 'Xander' }
        ]);
    });
    it('should sort an array in descending order by a specified key if key is prefixed with -', () => {
        let keysArray = ['-name'];
        let arrayToSort = [
            { name: 'Bill', age: 45 },
            { name: 'Jill', age: 55 },
            { name: 'Geoff', age: 66 },
            { name: 'Xander', age: 25 },
            { name: 'Sophie', age: 35 },
            { name: 'Britney', age: 35 }
        ];
        expect(orderByPipe.transform(arrayToSort, keysArray)).toEqual([
            { age: 25, name: 'Xander' },
            { age: 35, name: 'Sophie' },
            { age: 55, name: 'Jill' },
            { age: 66, name: 'Geoff' },
            { age: 35, name: 'Britney' },
            { age: 45, name: 'Bill' }
        ]);
    });
    it('should sort an array in ascending order by one key and descending order by another subKey if specified and prefixed with -', () => {
        let keysArray = ['name', '-age'];
        let arrayToSort = [
            { name: 'Bill', age: 45 },
            { name: 'Bill', age: 55 },
            { name: 'Jill', age: 66 },
            { name: 'Jill', age: 25 },
            { name: 'Sophie', age: 35 },
            { name: 'Britney', age: 35 }
        ];
        expect(orderByPipe.transform(arrayToSort, keysArray)).toEqual([
            { age: 55, name: 'Bill' },
            { age: 45, name: 'Bill' },
            { age: 35, name: 'Britney' },
            { age: 66, name: 'Jill' },
            { age: 25, name: 'Jill' },
            { age: 35, name: 'Sophie' }
        ]);
    });
    it('should order by key and subkey in ascending order if specified with no - prefix', () => {
        let keysArray = ['name', 'age'];
        let arrayToSort = [
            { name: 'Bill', age: 45 },
            { name: 'Bill', age: 55 },
            { name: 'Jill', age: 66 },
            { name: 'Jill', age: 25 },
            { name: 'Sophie', age: 35 },
            { name: 'Britney', age: 35 }
        ];
        expect(orderByPipe.transform(arrayToSort, keysArray)).toEqual([
            { age: 45, name: 'Bill' },
            { age: 55, name: 'Bill' },
            { age: 35, name: 'Britney' },
            { age: 25, name: 'Jill' },
            { age: 66, name: 'Jill' },
            { age: 35, name: 'Sophie' }
        ]);
    });
});