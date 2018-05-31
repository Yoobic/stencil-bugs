import { TestWindow } from '@stencil/core/testing';
import { YooLoginComponent } from './login';

describe('YooLoginComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooLoginComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('should render', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render custom left panel header icon', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login left-panel-header-icon="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render left panel footer text', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login left-panel-footer-text="this is the left panel footer"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render right panel title icon', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login right-panel-title-icon="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render right panel title text', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login right-panel-title-text="This is the right panel title"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render right panel footer icon', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login right-panel-footer-icon="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render right panel footer text', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login right-panel-footer-text="This is the right panel footer"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render custom right panel background', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login background-src="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render full custom component', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login class="success" left-panel-header-icon="./assets/logo/operations_landscape_dark.svg" left-panel-footer-text="v 4.9.4" right-panel-title-text="We improve your store performance" right-panel-title-icon="./assets/logo/operations_landscape_light.svg" right-panel-footer-text="Powered by: " background-src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Star-Wars-Backgrounds.jpg"></yoo-login>'
            });
            expect(element).toMatchSnapshot();
        });
    });
    //
    describe('events', () => {
        it('should not emit doLogin on button click with undefined email and password', async () => {
            let element = await window.load({
                components: [YooLoginComponent],
                html: '<yoo-login></yoo-login>'
            });

            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('doLogin', emitItem);
            await element.querySelector('.login-button > yoo-button').click();
            expect(emitItem).not.toHaveBeenCalled();
        });
        it('should emit languageSelectedParent', async () => {
            let element = new YooLoginComponent();
            element.languageSelectedParent = {
                emit: () => { }
            };
            const changedSpy = jest.spyOn(element.languageSelectedParent, 'emit');
            element.onLanguageSelected(<CustomEvent>{ detail: 'hello' });
            expect(changedSpy).toHaveBeenCalledWith('hello');
        });
    });
});
