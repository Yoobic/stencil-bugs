import { pipes } from '../pipe';

describe('Pipe: User Initial', () => {

    const defaultResult: string = '';
    let results = [
        { user: { firstName: 'John', lastName: 'Mick', username: '' }, result: 'JM' },
        { user: { firstName: 'Seb', lastName: 'Valoi', username: '' }, result: 'SV' },
        { user: { firstName: 'Maria', lastName: 'Fernandez', username: '' }, result: 'MF' },
        { user: { firstName: null, lastName: 'Mick', username: 'jackmao' }, result: 'ja' },
        { user: { firstName: 'John', lastName: null, username: 'hoyiu' }, result: 'ho' },
        { user: null, result: defaultResult }
    ];

    results.forEach(i => {
        it(`It should return ${i.result} with : ${i.user} , firstName: ${i.user ? i.user.firstName : ''}, lastName: ${i.user ? i.user.lastName : ''}`, () => {
            expect(pipes.userInitial.transform(i.user)).toEqual(i.result);
        });
    });
});