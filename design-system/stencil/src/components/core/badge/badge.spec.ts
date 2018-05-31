import { TestWindow } from '@stencil/core/testing';
import { YooBadgeComponent } from './badge';

fdescribe('YooBadgeComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooBadgeComponent()).toBeTruthy();
    });
    describe('Rendering', () => {
        it ('Should display text', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="34"></yoo-badge>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should be displayed with the closeable icon', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="34" closeable="true"></yoo-badge>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should be displayed with an icon', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="34" icon="yo-fire"></yoo-badge>'
              });
            expect(element).toMatchSnapshot();
        });
    });

    describe('Re-Rendering', () => {
        it('Should re-render when text is updated', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="Tag"></yoo-badge>'
             });
             expect(element.text).toEqual('Tag');
             element.text = 'Hey';
             await window.flush();
             expect(element.text).toEqual('Hey');
             expect(element).toMatchSnapshot();
        });

        it('Should re-render when closeable is updated', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="Tag"></yoo-badge>'
             });
             element.closeable = true;
             await window.flush();
             expect(element.closeable).toEqual(true);
             expect(element).toMatchSnapshot();
        });

        it('Should re-render when icon is updated', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge icon="yo-fire" text="Tag"></yoo-badge>'
             });
             element.icon = 'yo-flag';
             await window.flush();
             expect(element.icon).toEqual('yo-flag');
             expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {
        it('Should trigger an event when closed', async () => {
            let element = await window.load({
                components: [YooBadgeComponent],
                html: '<yoo-badge text="Tag"></yoo-badge>'
             });
             element.closeable = true;
             expect(element.closeable).toEqual(true);
             await window.flush();
             element.close = jest.fn();
             await element.close();
             expect(element.close).toBeCalled();
        });
    });
});
