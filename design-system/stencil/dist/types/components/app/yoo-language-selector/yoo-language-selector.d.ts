import { EventEmitter } from '@stencil/core';
import { ILanguage } from '@shared/interfaces';
export declare class YooLanguageSelectorComponent {
    languages: ILanguage[];
    isMobile: boolean;
    languageSelected: EventEmitter<string>;
    hasSlimScroll: boolean;
    host: HTMLElement;
    componentDidLoad(): void;
    getSizeContainer(): {
        height: string;
        width: string;
    };
    onLanguageSelector(language: string): void;
    renderList(language: ILanguage): JSX.Element;
    render(): JSX.Element;
}
