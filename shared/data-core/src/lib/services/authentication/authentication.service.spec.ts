import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { Authentication } from './authentication.service';
import { Config } from '../config/config.service';
import { Network, LocalStorage, CoreConfig } from '@shared/common';

import { Observable, of, throwError } from 'rxjs';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b29iaWMuY29tIiwic3ViIjoiNWFiYjU4NzQzZTMwYWMwMDFiMjhlMTYzIiwiZXhwIjoxNTI1OTY1MTk3LCJqdGkiOiJmN2VjNWFjNS01MGUxLTQ5YWMtOTcyOC0yOWJiYjE2N2I4ZWEiLCJpYXQiOjE1MjMzNzMxOTcsInVzZXJuYW1lIjoibWFuYWdlci10ZXN0QHlvb2JpYy5jb20iLCJlbWFpbCI6Imxvb3BiYWNrQHlvb2JpYy5jb20iLCJfaWQiOiI1YWJiNTg3NDNlMzBhYzAwMWIyOGUxNjMiLCJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJNYW5hZ2VyIiwibGFuZ3VhZ2UiOiJlbiIsInRpbWV6b25lIjoiRXVyb3BlL0xvbmRvbiIsImdyb3VwcyI6WyJlMmV0ZXN0LW1hbmFnZXIiLCJ0ZXN0Il0sInJvbGVzIjpbImNhbGVuZGFydXNlciIsImNyZWF0b3IiLCJkYXNoYm9hcmQiLCJkb2N1bWVudHN1c2VyIiwiZm9sbG93dXAiLCJtYW5hZ2VyIiwibWlzc2lvbmFuYWx5c2lzIiwibWlzc2lvbnZpZXdlciIsIm5ld3NjcmVhdG9yIiwibmV3c3VzZXIiLCJwb2xsdXNlciIsInNlcnZpY2UiLCJzZXJ2aWNldXNlciIsInRlYW0iLCJ0b2RvIl0sInVzZXJJZCI6IjVhYmI1ODc0M2UzMGFjMDAxYjI4ZTE2MyJ9.-ldYVpewNGdjD0CvpS77-4anRgCD1nNYjOgQzf0UTHU';

describe('data-core: services: authentication', () => {
    describe('login', () => {
        let ls = new LocalStorage( new CoreConfig(null, null));
        let mockSession = jest.fn<Session>( () => ({
            clear: jest.fn(() => Promise.resolve(null))
        }));
        let session = new mockSession();
        const mockBroker = jest.fn<Broker>(() => ({
            getServerUrl: jest.fn(() => 'mocks.yoobic.com/api/'),
            getApiUrl: jest.fn(() => 'mocks.yoobic.com/api/'),
            session: session
        }));
        let broker = new mockBroker();

        const mockNetwork = jest.fn<Network>(() => ({
            forceOffline: jest.fn(() => null)
        }));
        let network = new mockNetwork();
        const mockConfig = jest.fn<Config>(() => ({
            isTestPen: jest.fn(() => false)
        }));
        let config = new mockConfig();

        const mockRq = jest.fn<Requestor>();
        const mockPost = jest.fn<Observable<any>>();
        let rq = new mockRq();
        rq.post = mockPost;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should perform successful login', async () => {

            mockPost.mockImplementation(() => {
                return of({ userId: 1, user: 'John Doe', $mcfly$token: TOKEN });
            });

            let authentication = new Authentication(rq, null, null, broker, null, ls, null, session);
            authentication.login('test@yoobic.com', 'yoobic', []).subscribe();
            expect(session.userId).toEqual(1);
            expect(session.token).toEqual(TOKEN);
        });

        it('should fail login', () => {

            mockPost.mockImplementation(() => {
                return throwError({ error: 'FAILURE IN LOGIN' });
            });

            let authentication = new Authentication(rq, null, null, broker, null, ls, null, session);
            authentication.login('test@yoobic.com', 'yoobic', []).subscribe();
            expect(session.token).toBeFalsy();
        });

        it('should logout', async () => {

            mockPost.mockImplementation(() => {
                return of(null);
            });

            let authentication = new Authentication(rq, null, config, broker, network, ls, null, session);
            await authentication.logout();
            expect(session.token).toBeFalsy();
            expect(network.forceOffline).toHaveBeenCalledWith(false, false);
        });

    });

    describe('helper functions', () => {
        let authentication;
        beforeEach(() => {
            authentication = new Authentication(null, null, null, null, null, null, null, null);
        });

        it('should generate password of length 8', () => {
            let res1 = authentication.generatePassword();
            let res2 = authentication.generatePassword();
            expect(res1.length).toEqual(8);
            expect(res1).not.toEqual(res2);
        });

        it('should decode tenant from token', () => {
            let res = authentication.getTenantFromToken(TOKEN);
            expect(res._id).toEqual('5abb58743e30ac001b28e163');
        });

    });

});