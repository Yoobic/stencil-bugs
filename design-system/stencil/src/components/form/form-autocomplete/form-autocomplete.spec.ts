import { TestWindow } from '@stencil/core/testing';
import { YooFormAutocompleteComponent } from './form-autocomplete';

describe('YooFormAutocompleteComponent', () => {
    it('should build', () => {
        expect(new YooFormAutocompleteComponent()).toBeTruthy();
    });

    describe('rendering', () => {
      let window, element;
      beforeEach( async () => {
        window = new TestWindow();
        element = await window.load({
            components: [YooFormAutocompleteComponent],
            html: '<yoo-form-autocomplete></yoo-form-autocomplete>'
          });
        });
        it ('should render', async () => {
            expect(element).toBeDefined();
        });
    });
});
