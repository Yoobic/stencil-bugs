import { TestWindow } from '@stencil/core/testing';
import { YooFormPhotoComponent } from './form-photo';

describe('YooFormPhotoComponent', () => {
    it('should build', () => {
        expect(new YooFormPhotoComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let window, element;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFormPhotoComponent],
                html: '<yoo-form-photo></yoo-form-photo>'
            });
        });

        it('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it('Should render with a value prop', async () => {
            element.value = 'my value';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with extraData prop', async () => {
            element.extraData = { edit: null, texts: [] };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with placeholder prop', async () => {
            element.placeholder = 'my placeholder';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render as required', async () => {
            element.required = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render as readonly', async () => {
            element.readonly = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with photo type', async () => {
            element.type = 'photo';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with video type', async () => {
            element.type = 'video';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with audio type', async () => {
            element.type = 'audio';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with multiple', async () => {
            element.multiple = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with allow library', async () => {
            element.allowLibrary = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with allow annotate', async () => {
            element.allowAnnotate = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with image recognition button', async () => {
            element.isImageRecognition = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with label', async () => {
            element.label = 'my label';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {
        let emitEvent, window;
        beforeEach(async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });

        // it('Should emit the value prop when it changes', async () => {

        // });
    });
});