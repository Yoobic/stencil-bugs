import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Models } from '../models/models.service';
import { Googlemaps } from '../googlemaps/googlemaps.service';
import { Workplace } from '../workplace/workplace.service';
import { Session } from '../session/session.service';
import { Files } from '../files/files.service';
import { Box } from '../box/box.service';
import { Config } from '../config/config.service';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Location } from '../../interfaces/location/location.interface';
import { Observable, Observer, forkJoin, from, of } from 'rxjs';
import { Network } from '@shared/common';
import { Broker } from './broker.service';

describe('data-core: services: broker', () => {
    //let rq, config, network, session;
    let mockGet = jest.fn<Observable<any>>(() => of(null));
    let mockPost = jest.fn<Observable<any>>(() => of(null));
    let mockPut = jest.fn<Observable<any>>(() => of(null));
    let mockPatch = jest.fn<Observable<any>>(() => of(null));
    let broker;

    beforeEach(() => {
        const mockConfig = jest.fn<Config>(() => ({
            isTestPen: jest.fn(() => false),
            apiUrl: 'api.mock/'
        }));
        let config = new mockConfig();

        const mockNetwork = jest.fn<Network>(() => ({
            isOffline: jest.fn(() => false),
        }));
        let network = new mockNetwork();

        const mockSession = jest.fn<Session>(() => ({
            user: '1111'
        }));
        let session = new mockSession();

        const mockFiles = jest.fn<Files>(() => ({
            isImageFile: jest.fn(() => false)
        }));
        let files = new mockFiles();

        const mockRq = jest.fn<Requestor>(() => ({
            get: mockGet,
            post: mockPost,
            put: mockPut,
            patch: mockPatch
        }));
        let rq = new mockRq();
        broker = new Broker(rq, null, null, null, session, files, null, null, null, network, null, null, config, null);
        jest.clearAllMocks();
    });
    describe('getById', () => {
        it('should get by id', async () => {
            let result;
            broker.getById('collection', '1').subscribe();
            expect(mockGet).toMatchSnapshot();
        });

        it('should be get by a non standard id', () => {
            let result;
            broker.getById('collection', '1', undefined, undefined, 'notid').subscribe();
            expect(mockPost).toMatchSnapshot();
        });
    });

    describe('upsert', () => {
        const ENTITY = {
            title: 'Test',
            background: {
                _downloadURL : 'https://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1513348890/dwitbomq9ilccln6702l.png',
                _filename : 'Screen shot 2017-12-15 à 15.32.33.png'
            },
            'f84ab24a-d931-4b4a-a7bc-6a167acc22a5': {
                value : 'https://res.cloudinary.com/www-yoobic-com/image/upload/a_exif/v1504262031/tobfp8xpdq8qgpoaxfdv.jpg',
                fieldType : 'photo',
                fieldTitle : 'Photo'
            }
        };
        let result;
        it('should upsert an existing entity', async () => {
            broker.upsert('collection', {_id: 1, ...ENTITY }).subscribe();
            expect(mockPatch).toMatchSnapshot();
        });

        it('should upsert with a new entity', () => {
            broker.upsert('collection', ENTITY).subscribe();
            expect(mockPost).toMatchSnapshot();
        });

        it('should upsert missiondatas', () => {
            broker.upsert('missiondatas', ENTITY).subscribe();
            expect(mockPost).toMatchSnapshot();
        });

        it('should upsert with previous entity', () => {

        });

    });
});