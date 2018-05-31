import { TestWindow } from '@stencil/core/testing';
import { YooSearchPageComponent } from './search-page';

describe('SearchPageComponent', () => {
    it('should build', () => {
        expect(new YooSearchPageComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooSearchPageComponent],
                html: '<yoo-search-page></yoo-search-page>'
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