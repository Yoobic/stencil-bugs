import { TestWindow } from '@stencil/core/testing';
import { YooWalkthroughComponent } from './walkthrough';

describe('WalkthroughComponent', () => {
    it('should build', () => {
        expect(new YooWalkthroughComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooWalkthroughComponent],
                html: '<yoo-walkthrough></yoo-walkthrough>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });
    });
});