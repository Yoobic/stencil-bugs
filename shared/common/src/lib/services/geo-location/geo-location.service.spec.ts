import { GeoLocation, Position } from './geo-location.service';
import { CoreConfig } from '../core-config/core-config.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
jest.mock('@ionic-native/geolocation/ngx');

describe('Service: GeoLocation', () => {

    let geoLocationService: GeoLocation;
    let mockIsCordova = jest.fn();
    let mockIonicGetCurrentPosition = jest.fn(() => Promise.resolve({coords: {}}));
    let mockNavigatorGetCurrentPosition = jest.fn(callbackFunction => callbackFunction({ coords: {} }));

    beforeEach(() => {
        let mockIonicGeolocation = jest.fn<Geolocation>(() => ({
            getCurrentPosition: mockIonicGetCurrentPosition
        }));
        let ionicGeolocation = new mockIonicGeolocation();

        let mockCoreConfig = jest.fn<CoreConfig>(() => ({
            isCordova: mockIsCordova
        }));
        let coreConfig = new mockCoreConfig();

        Object.defineProperty(navigator, 'geolocation', {
            value: {getCurrentPosition: mockNavigatorGetCurrentPosition}
        });

        geoLocationService = new GeoLocation(ionicGeolocation, coreConfig);
        jest.clearAllMocks();
    });

    describe('getDistance', () => {
        let yoobic = {
            lat: 51.531647,
            long: -0.237592
        };
        let northPole = {
            lat: 64.751111,
            long: -147.349444
        };
        let costa = {
            lat: 51.536016,
            long: -0.245396
        };

        it('should return the correct distance in km between two lat/long coordinates if no unit specified', () => {
            let distance = geoLocationService.getDistance(yoobic.lat, yoobic.long, northPole.lat, northPole.long);
            expect(distance).toBeCloseTo(6778.78450, 4);
        });

        it('should return the correct distance in nautical miles between two lat/long coordinates if specified', () => {
            let distance = geoLocationService.getDistance(yoobic.lat, yoobic.long, costa.lat, costa.long, 'N');
            expect(distance).toBeCloseTo(0.39184691, 5);
        });

    });

    describe('getLocation', () => {

        beforeEach(() => {
        });

        it('should call ionic geolocation service correctly if is cordova', () => {
            mockIsCordova.mockImplementationOnce(() => true);

            geoLocationService.getLocation();
            expect(mockIonicGetCurrentPosition).toHaveBeenCalledWith({
                enableHighAccuracy: true, maximumAge: 90000, timeout: expect.any(Number)
            });
            expect(mockNavigatorGetCurrentPosition).not.toHaveBeenCalled();
        });

        it('should call navigator.geoLocation.getCurrentPosition once ', () => {
            geoLocationService.getLocation();
            geoLocationService.getLocation();
            expect(mockNavigatorGetCurrentPosition).toHaveBeenCalledTimes(1);
            expect(mockNavigatorGetCurrentPosition).toHaveBeenCalledWith(
                expect.any(Function),
                expect.any(Function),
                {enableHighAccuracy: false, maximumAge: 600000, timeout: 10000});
        });

        it('should call navigator.geoLocation.getCurrentPosition with force no cache ', () => {
            geoLocationService.getLocation();
            geoLocationService.getLocation(true);
            expect(mockNavigatorGetCurrentPosition).toHaveBeenCalledTimes(2);
            expect(mockNavigatorGetCurrentPosition).toHaveBeenCalledWith(
                expect.any(Function),
                expect.any(Function),
                {enableHighAccuracy: false, maximumAge: 600000, timeout: 10000});
        });

    });
});

describe('Class: Position', () => {

    describe('constructor', () => {

        it('should correctly map a string with lat and long comma separated into a position object', () => {
            let position: Position = new Position('55,60');
            expect(position.toGeoLoc()).toEqual([55, 60]);
        });

        // I'm not sure what the accuracy value is actually used for.
        // It's set but not accessed in any of the public methods of the Position class
        it('should correctly map an object with latitude and longitude values to a position object', () => {
            let position: Position = new Position({ latitude: 55, longitude: 55, accuracy: 5 });
            expect(position.toJson()).toEqual({ latitude: 55, longitude: 55 });
        });
    });

    describe('toGeoLoc', () => {
        it('should respect the reversed paramater', () => {
            let position: Position = new Position('55,60');
            expect(position.toGeoLoc(true)).toEqual([60, 55]);
        });
    });

    describe('toStringLoc', () => {
        it('should return position in string format', () => {
            let position: Position = new Position({ latitude: 55, longitude: 45 });
            expect(position.toStringLoc()).toEqual('55,45');
        });
    });
});
