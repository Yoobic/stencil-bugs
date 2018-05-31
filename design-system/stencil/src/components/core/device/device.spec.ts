import { TestWindow } from '@stencil/core/testing';
import { YooDeviceComponent } from './device';

describe('YooDeviceComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('Should build', () => {
        expect(new YooDeviceComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('should render', async () => {
            let element = await window.load({
                components: [YooDeviceComponent],
                html: '<yoo-device></yoo-device>'
              });
            expect(element).toMatchSnapshot();
        });

        it('Should render without a top bar', async () => {
            let element = await window.load({
                components: [YooDeviceComponent],
                html: '<yoo-device hide-bar="true"></yoo-device>'
              });
            expect(element).toMatchSnapshot();
        });

        it('Should render with a heading', async () => {
            let element = await window.load({
                components: [YooDeviceComponent],
                html: '<yoo-device heading="Yoobic"></yoo-device>'
              });
            expect(element).toMatchSnapshot();
        });

    });

    describe('Re-rendering', () => {
        it('Should re-render when heading is updated', async () => {
            let element = await window.load({
                components: [YooDeviceComponent],
                html: '<yoo-device heading="Yoobic"></yoo-device>'
              });
            expect(element.heading).toEqual('Yoobic');
            element.heading = 'Operation';
            await window.flush();
            expect(element.heading).toEqual('Operation');
            expect(element).toMatchSnapshot();
        });

        it('Should re-render when the heading is updated', async () => {
            let element = await window.load({
                components: [YooDeviceComponent],
                html: '<yoo-device heading="Yoobic"></yoo-device>'
              });
            expect(element.hideBar).toEqual(false);
            element.hideBar = true;
            await window.flush();
            expect(element.hideBar).toEqual(true);
            expect(element).toMatchSnapshot();
        });

    });
});