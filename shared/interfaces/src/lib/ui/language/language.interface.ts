export interface ILanguage {
    icon?: string;
    title?: string;
    value?: string;
}

export interface ILanguageSelector {
    currentLanguage: string;
    languages: ILanguage[];
}