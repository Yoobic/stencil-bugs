jest.mock('tinymce');
import { TestWindow } from '@stencil/core/testing';
import { YooFormTextEditorComponent } from './form-text-editor';
import tinymce from 'tinymce';

describe('YooFormTextEditorComponent', () => {
    it('should build', () => {
        expect(new YooFormTextEditorComponent()).toBeTruthy();
    });

    describe('Snapshot', () => {
        let element;
        beforeEach( async () => {
          let window = new TestWindow();
          element = await window.load({
            components: [YooFormTextEditorComponent],
            html: '<yoo-form-text-editor></yoo-form-text-editor>'
          });
        });
        it ('Should render', async () => {
            expect(tinymce.init).toHaveBeenCalled();

            expect(element).toMatchSnapshot();
        });
    });
});
