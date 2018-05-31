import { UserinitialPipe } from './userinitial.pipe';

describe('pipes: UserinitialPipe', () => {
    let userinitialPipe: UserinitialPipe = new UserinitialPipe();

    it('should return initial based on first and last Name', () => {
        let user = {
            firstName: 'Tony',
            lastName: 'Blair',
            username: 'dev@yoobic.com'
        };
        expect(userinitialPipe.transform(user)).toEqual('TB');
    });

    it('should return initial based on username if no first and last Name', () => {
        let user = {
            username: 'dev@yoobic.com'
        };
        expect(userinitialPipe.transform(user)).toEqual('de');
    });

    it('should return blank if none was supplied', () => {
        let user = {
            email: 'dev@yoobic.com'
        };
        expect(userinitialPipe.transform(user)).toEqual('');
    });

    it('should return NA if no user was supplied', () => {

        expect(userinitialPipe.transform(undefined)).toEqual('NA');
    });

});