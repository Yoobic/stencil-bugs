import { TestWindow } from '@stencil/core/testing';
import { YooAlertComponent } from './alert';

jest.mock('../../../utils/anim');

describe('YooAlertComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooAlertComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should have text content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert text="alert accent" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should have heading content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert heading="alert accent" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('Should have icon content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert icon="yo-check-tick" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should have closeable content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert closeable="true" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('Should have heading and text content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert heading="alert accent" text="alert text" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

          it ('Should have heading and text and closeable content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert heading="alert accent" text="alert text" closeable="true" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

          it ('Should have heading and text and icon content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert heading="alert accent" text="alert text" icon="yo-check-tick" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

          it ('Should have heading and text and icon and closeable content', async () => {
            let element = await window.load({
               components: [YooAlertComponent],
               html: '<yoo-alert heading="alert accent" text="alert text" icon="yo-check-tick" closeable="true" class="accent toast"></yoo-alert>'
            });
            expect(element).toMatchSnapshot();
        });

    });

    describe('Events', () => {

        it('should trigger click close event when dismiss', async () => {
            let element = await window.load({
                components: [YooAlertComponent],
                html: '<yoo-alert text="alert" class="accent toast" closeable="true"></yoo-alert>'
             });

            let closeButton: HTMLElement = element.querySelector('.close-container > .close');
            expect(element.querySelector('.container').classList).not.toContain('closed');
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('alertClosed', emitItem);
            await closeButton.click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(true);
            await window.flush();
            expect(element.querySelector('.container').classList).toContain('closed');
        });

    });

});
