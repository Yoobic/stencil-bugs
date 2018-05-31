import { HttpsPipe } from './https.pipe';
import { CoreConfig } from '../../services/core-config/core-config.service';
import { Utils } from '../../services/utils/utils.service';

describe('Pipe: HttpsPipe', () => {
    let mockCoreConfig = <any>{
        isWKWebView: () => false
    };
    let utils = new Utils(<any>mockCoreConfig);
    let httpsPipe: HttpsPipe = new HttpsPipe(mockCoreConfig as CoreConfig, utils);
    it('should format url correctly to https: if that is specified in coreconfig', () => {
        mockCoreConfig.getProtocol = () => 'https:';
        expect(httpsPipe.transform('http://www.blah.com'))
            .toEqual('https://www.blah.com');
    });
    it('should format url correctly to another protocol as specified in coreconfig', () => {
        mockCoreConfig.getProtocol = () => 'proootocol:';
        expect(httpsPipe.transform('http://www.blah.com'))
            .toEqual('proootocol://www.blah.com');
    });
    it('should not strip out ://file from string if coreconfig.WKWebView() returns false', () => {
        mockCoreConfig.getProtocol = () => 'proootocol:';
        mockCoreConfig.isWKWebView = () => false;
        expect(httpsPipe.transform('http://file://www.blah.com', true))
            .toEqual('proootocol://file://www.blah.com');
    });
    it('should strip out ://file from string if coreconfig.WKWebView() returns true', () => {
        mockCoreConfig.getProtocol = () => 'proootocol:';
        mockCoreConfig.isWKWebView = () => true;
        expect(httpsPipe.transform('http://file://www.blah.com', true))
            .toEqual('proootocol://www.blah.com');
    });
});