import { Config } from './config.service';
import { LocalStorage, ConfigConstants, CoreConfig } from '@shared/common';

describe('@shared: data-core', () => {
    const dev = new ConfigConstants;
    dev.setConfig({
        configMode: 'dev'
    });

    const prod = new ConfigConstants;
    prod.setConfig({
        configMode: 'prod'
    });

    let ls = new LocalStorage(new CoreConfig(dev, null));
    let configService;

    xit('should return testpen values when url is testpen', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'testpen-dashboard.yoobic.com',
            configurable: true
        });

        configService = new Config(ls, dev, new CoreConfig(dev, null), null);
        expect(configService.servers.length).toEqual(1);
        expect(configService.serverUrl).toEqual('https://testpen.yoobic.com/');
        expect(configService.apiUrl).toEqual('https://testpen.yoobic.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev/');
        expect(configService.serverName).toEqual('Testpen');
    });

    xit('should return localhost servers & Urls when url is localhost', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'localhost',
            configurable: true
        });
        configService = new Config(ls, dev, new CoreConfig(dev, null), null);
        expect(configService.servers.length).toEqual(9);
        expect(configService.serverUrl).toEqual('https://yoobic-loopback-dev-v3.herokuapp.com/');
        expect(configService.apiUrl).toEqual('https://yoobic-loopback-dev-v3.herokuapp.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev/');
        expect(configService.serverName).toEqual('Development');
    });

    xit('should return dev server when no server is set and mode is dev', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'dashboard.yoobic.com',
            configurable: true
        });
        configService = new Config(ls, dev, new CoreConfig(dev, null), null);
        expect(configService.servers.length).toEqual(9);
        expect(configService.serverUrl).toEqual('https://yoobic-loopback-dev-v3.herokuapp.com/');
        expect(configService.apiUrl).toEqual('https://yoobic-loopback-dev-v3.herokuapp.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev/');
        expect(configService.serverName).toEqual('Development');
    });

    xit('should return prod server when no server is set and mode is prod', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'dashboard.yoobic.com',
            configurable: true
        });
        configService = new Config(ls, prod, new CoreConfig(prod, null), null);
        expect(configService.servers.length).toEqual(9);
        expect(configService.serverUrl).toEqual('https://api3.yoobic.com/');
        expect(configService.apiUrl).toEqual('https://api3.yoobic.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-production-v3/');
        expect(configService.serverName).toEqual('Production');
    });
    xit('should return the server saved when mode is dev', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'dashboard.yoobic.com',
            configurable: true
        });

        //configService = new Config(mockLocalStorage, dev, new CoreConfig(dev, null));
        expect(configService.servers.length).toEqual(7);
        expect(configService.serverUrl).toEqual('http://test.server.com/');
        expect(configService.apiUrl).toEqual('http://test.server.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev/');
        expect(configService.serverName).toEqual('');
        ls.remove('SERVER');
    });

    xit('should return the server from the configuration', () => {
        Object.defineProperty(location, 'hostname', {
            value: 'dashboard.yoobic.com',
            configurable: true
        });

        let testServer = {
            _id: 'e2e',
            name: 'e2e',
            url: 'https://yoobic-loopback-e2e.herokuapp.com/'
        };
        const testConfig = new ConfigConstants;
        testConfig.setConfig({
            configMode: 'e2e',
            server: testServer
        });
        configService = new Config(ls, testConfig, new CoreConfig(dev, null), null);
        expect(configService.servers.length).toEqual(1);
        expect(configService.serverUrl).toEqual('https://yoobic-loopback-e2e.herokuapp.com/');
        expect(configService.apiUrl).toEqual('https://yoobic-loopback-e2e.herokuapp.com/api/');
        expect(configService.mappingUrl).toEqual('https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev/');
        expect(configService.serverName).toEqual('e2e');
    });
});