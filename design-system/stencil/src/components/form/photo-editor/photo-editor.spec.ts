import { TestWindow } from '@stencil/core/testing';
import { YooPhotoEditorComponent } from './photo-editor';

describe('PhotoEditorComponent', () => {
    it('should build', () => {
        expect(new YooPhotoEditorComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooPhotoEditorComponent],
                html: `<yoo-photo-editor></yoo-photo-editor>`
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it ('Should render with props', async () => {
            element.readonly = true;
            await window.flush();
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