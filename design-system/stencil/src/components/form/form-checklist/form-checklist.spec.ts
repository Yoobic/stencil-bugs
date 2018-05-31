import { TestWindow } from '@stencil/core/testing';
import { YooFormChecklistComponent } from './form-checklist';

describe('YooFormChecklistComponent', () => {
    it('should build', () => {
        expect(new YooFormChecklistComponent()).toBeTruthy();
    });

    describe('rendering', () => {
        it ('should render', async () => {
          let window = new TestWindow();
          let element = await window.load({
                components: [YooFormChecklistComponent],
                html: '<yoo-form-checklist></yoo-form-checklist>'
              });
            expect(element).toBeDefined();
        });
    });
});
