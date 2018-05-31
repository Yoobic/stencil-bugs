import { TestWindow } from '@stencil/core/testing';
jest.mock('../../../utils/anim');
import { YooLanguageSelectorComponent } from './language-selector';

describe('YooLanguageSelectorComponent', () => {
    const data = [{ title: 'English', value: 'EN', icon: 'flag-icon flag-icon-gb' },
    { title: 'English US', value: 'EN', icon: 'flag-icon flag-icon-us' },
    { title: 'Spanish', value: 'ES', icon: 'flag-icon flag-icon-es' },
    { title: 'French', value: 'FR', icon: 'flag-icon flag-icon-fr' },
    { title: 'Dutch', value: 'NL', icon: 'flag-icon flag-icon-nl' },
    { title: 'Italian', value: 'IT', icon: 'flag-icon flag-icon-it' },
    { title: 'German', value: 'DE', icon: 'flag-icon flag-icon-de' }];

    let window;
    beforeEach(() => {
        window = new TestWindow();
    });

    it('should build', () => {
        expect(new YooLanguageSelectorComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('should render', async () => {
            let element = await window.load({
                components: [YooLanguageSelectorComponent],
                html: '<yoo-language-selector></yoo-language-selector>'
            });
            expect(element).toMatchSnapshot();
        });
        it('should have a current language', async () => {
            let element = await window.load({
                components: [YooLanguageSelectorComponent],
                html: '<yoo-language-selector class="success" current-language="en"></yoo-language-selector>'
                });
            expect(element).toMatchSnapshot();
        });

        it('should have a list of 6 languages', async () => {
            let element = await window.load({
                components: [YooLanguageSelectorComponent],
                html: '<yoo-language-selector class="success" current-language="en"></yoo-language-selector>'
                });
            element.languages = data;
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });

    });
    //TODO fix event
    describe('events', () => {
        xit('should emit on li click', async () => {
            let element = await window.load({
                components: [YooLanguageSelectorComponent],
                html: '<yoo-language-selector></yoo-language-selector>'
            });
            element.languages = data;
            await window.flush();

            let res;
            let emitLi = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('languageSelected', emitLi);
            let liItem = element.querySelector('.icon');
            await liItem.click();
            expect(emitLi).toHaveBeenCalled();
            expect(res).toEqual('EN');
        });
    });
});
