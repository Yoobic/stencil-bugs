import { TestWindow } from '@stencil/core/testing';
import { YooFormInputContainerComponent } from './form-input-container';

describe('YooFormInputContainerComponent', () => {
    it('should build', () => {
        expect(new YooFormInputContainerComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should have description content', async () => {
            let window = new TestWindow();
            let element = await window.load({
               components: [YooFormInputContainerComponent],
               html: '<yoo-form-input-container description="i am description"></yoo-form-input-container>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should have label content', async () => {
            let window = new TestWindow();
            let element = await window.load({
               components: [YooFormInputContainerComponent],
               html: '<yoo-form-input-container label="i am label"></yoo-form-input-container>'
            });
            expect(element).toMatchSnapshot();
        });

          it ('Should have hint content', async () => {
            let window = new TestWindow();
            let element = await window.load({
               components: [YooFormInputContainerComponent],
               html: '<yoo-form-input-container hint="i am hint"></yoo-form-input-container>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('Should have all attributes', async () => {
            let window = new TestWindow();
            let element = await window.load({
               components: [YooFormInputContainerComponent],
               html: '<yoo-form-input-container hint="i am hint" label="i am label" description="i am description"</yoo-form-input-container>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should have all attributes and slot content', async () => {
            let window = new TestWindow();
            let element = await window.load({
               components: [YooFormInputContainerComponent],
               html: '<yoo-form-input-container hint="i am hint" label="i am label" description="i am description" <div > <yoo-form-checkbox text="this is a checkbox" class="accent"></yoo-form-checkbox> </div> </yoo-form-input-container>'
            });
            expect(element).toMatchSnapshot();
        });
    });
});
