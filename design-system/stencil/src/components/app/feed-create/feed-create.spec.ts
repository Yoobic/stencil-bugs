import { TestWindow } from '@stencil/core/testing';
import { YooFeedCreateComponent } from './feed-create';

describe('FeedCreateComponent', () => {
    it('should build', () => {
        expect(new YooFeedCreateComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFeedCreateComponent],
                html: '<yoo-feed-create></yoo-feed-create>'
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