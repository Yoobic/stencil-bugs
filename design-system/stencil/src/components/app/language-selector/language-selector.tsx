import { Component, EventEmitter, Event, Element, Prop, State } from '@stencil/core';
import { ILanguage } from '@shared/interfaces';
import { setAnimation } from '../../../utils/anim';

@Component({
    tag: 'yoo-language-selector',
    styleUrl: 'language-selector.scss',
    scoped: true
})
export class YooLanguageSelectorComponent {

    @Prop() languages: ILanguage[];
    @Prop() currentLanguage: string;

    @Event() languageSelected: EventEmitter<string>;

    @State() loaded: boolean = false;

     @Element() host: HTMLStencilElement;


    componentDidLoad() {
      setAnimation('fade', this.host, {open: true});
      setTimeout(() => {
        this.loaded = true;
      }, 500);
    }

    onLanguageSelector(language: string) {
        this.languageSelected.emit(language);
        document.querySelector('yoo-modal-controller').closeModal(false);
    }

    renderList(language: ILanguage): JSX.Element {
        return (
          <div class="item" attr-layout="column">
            <div class={'icon ' + (this.currentLanguage === language.value ? 'current' : '')} onClick={() => this.onLanguageSelector(language.value)}>
                <i class={language.icon + ' icon-class'}></i>
                {this.currentLanguage.toLowerCase() === language.value ? [
                <div class="overlay">
                </div>,
                <div class="check">
                <i class="yo-check"></i>
                </div> ]
                : null }
            </div>
            <div class="item-title">
              {language.title}
            </div>
          </div>
        );
    }

    render() {
      return (
        <yoo-modal has-header="false" class="language-selector" >
          <div class="heading">Language</div>
          {this.loaded ?
          <div class="lists-container" attr-layout="row">
            {this.languages.map((language) =>
             this.renderList(language)
            )}
          </div> :
          <div class="load-contaienr" attr-layout="row" attr-layout-align="center center">
            <yoo-loader class="large"></yoo-loader>
          </div>}
        </yoo-modal>
      );
    }
}
