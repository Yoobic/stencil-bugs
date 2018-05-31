
import { ITranslateService, ICoreConfig, IFilesService, ISessionService } from '@shared/interfaces';

const defaultTranslate = {
    get: (x: string) => x,
    polyglot: (x: string) => x
};

const defaultCoreConfig = {
    isIonic: () => true,
    isCordova: () => true
};

const defaultFile = {
    isFile: (x) => true,
    isBase64: (x) => true,
    isFileUri: (x) => true,
    isImageFile: (x) => true,
    isVideo: (x) => true,
    isDocument: (x) => true,
    getExtension: (x)  => 'pdf',
    toPng: (x) => {}
};

const defaultSession = {
    token: 'string',
    user: {},
    userId: 'string',
    groups: ['string'],
    roles: ['string']
};

const defaultServices = {
    translateService: defaultTranslate,
    coreConfigService: defaultCoreConfig,
    filesService: defaultFile,
    sessionService: defaultSession
};

function getService(name: string) {
    const service = window && (window as any)[name] ? (window as any)[name] : null;
    if (service) {
        return service;
    }
    return defaultServices[name];
}

export const services = {
    translate: getService('translateService') as ITranslateService,
    coreConfig: getService('coreConfigService') as ICoreConfig,
    files: getService('filesService') as IFilesService,
    session: getService('sessionService') as ISessionService
};