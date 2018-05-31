export interface ITranslateService {
    get: (text: string, options?: any) => string;
    polyglot: (text: string, options?: any) => string;
    getCurrentLanguage: () => string;
    getCurrentLanguageFull: (separator?: any) => string;
}