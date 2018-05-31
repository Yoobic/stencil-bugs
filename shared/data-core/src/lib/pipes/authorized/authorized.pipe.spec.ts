import { AuthorizedPipe } from './authorized.pipe';
import { Authentication } from '../../services/authentication/authentication.service';

describe('Pipe: AuthorizePipe', () => {

    let mockHasRoles = jest.fn();
    let mockIsAdmin = jest.fn();
    let mockAuthorization: Authentication;
    let authorizedPipe: AuthorizedPipe;

    beforeEach(() => {
        jest.resetAllMocks();
        mockAuthorization = new Authentication(null, null, null, null, null, null, null);
        mockAuthorization.hasRoles = mockHasRoles;
        mockAuthorization.isAdmin = mockIsAdmin;
        authorizedPipe = new AuthorizedPipe(mockAuthorization);
    });

    let rules = [
        {roles: false, admin: false, reverseRoles: false, result: false},
        {roles: true, admin: false, reverseRoles: false, result: true},
        {roles: false, admin: true, reverseRoles: false, result: false},
        {roles: true, admin: true, reverseRoles: false, result: true},
        {roles: false, admin: false, reverseRoles: true, result: true},
        {roles: true, admin: false, reverseRoles: true, result: false},
        {roles: false, admin: true, reverseRoles: true, result: true},
        {roles: true, admin: true, reverseRoles: true, result: true}
    ];

    rules.forEach (i => {
        it(`should ${i.result ? '' : 'not '}authorize when has ${i.roles ? '' : 'not '}roles and is ${i.admin ? '' : 'not '}admin`, () => {
            mockHasRoles.mockImplementation(() => i.roles);
            mockIsAdmin.mockImplementation(() => i.admin);
            expect(authorizedPipe.transform(['wonderwoman', 'superman'], i.reverseRoles)).toEqual(i.result);
        });
    });

        it(`should work without reverse Roles param`, () => {
            mockHasRoles.mockImplementation(() => false);
            mockIsAdmin.mockImplementation(() => false);
            expect(authorizedPipe.transform(['wonderwoman', 'superman'])).toEqual(false);
        });

        it(`should work with string param`, () => {
            mockHasRoles.mockImplementation(() => false);
            mockIsAdmin.mockImplementation(() => false);
            authorizedPipe.transform('wonderwoman'); // tslint:disable-line
            expect(mockHasRoles).toHaveBeenCalledWith(['wonderwoman']);
        });

});