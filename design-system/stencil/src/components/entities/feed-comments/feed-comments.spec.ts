import { TestWindow } from '@stencil/core/testing';
import { YooFeedCommentsComponent } from './feed-comments';

describe('FeedCommentsComponent', () => {
    it('should build', () => {
        expect(new YooFeedCommentsComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFeedCommentsComponent],
                html: '<yoo-feed-comments></yoo-feed-comments>'
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