import { TestWindow } from '@stencil/core/testing';
import { YooCardPlaceholderComponent } from './card-placeholder';

describe('CardPlaceholderComponent', () => {
    it('should build', () => {
        expect(new YooCardPlaceholderComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooCardPlaceholderComponent],
                html: '<yoo-card-placeholder></yoo-card-placeholder>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
    });
});