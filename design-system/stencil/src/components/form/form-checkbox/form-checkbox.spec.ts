import { TestWindow } from '@stencil/core/testing';
import { YooFormCheckboxComponent } from './form-checkbox';

describe('YooFormCheckboxComponent', () => {
    it('should build', () => {
        expect(new YooFormCheckboxComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('should have text and class', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox text="this is text" class="accent"></yoo-form-checkbox>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should have indeterminate', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox text="this is text" class="accent" indeterminate="true"></yoo-form-checkbox>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('should have checkced state', async () => {
             let window = new TestWindow();
             let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox text="this is text" class="accent" state="checked"></yoo-form-checkbox>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('should be disabled', async () => {
             let window = new TestWindow();
             let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox text="this is text" disabled="true"></yoo-form-checkbox>'
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('rendering', () => {
       it('should re-render when state is updated', async () => {
           let window = new TestWindow();
           let element = await window.load({
               components: [YooFormCheckboxComponent],
               html: '<yoo-form-checkbox text="this is text" class="accent"></yoo-form-checkbox>'
           });
           expect(element.state).toEqual('unchecked');
           element.state = 'checked';
           await window.flush();

           expect(element.state).toEqual('checked');
       });

       it('should render state and text', async () => {
           let window = new TestWindow();
           let element = await window.load({
               components: [YooFormCheckboxComponent],
               html: '<yoo-form-checkbox text="this is text" state="checked" class="accent"></yoo-form-checkbox>'
           });
           expect(element.state).toEqual('checked');
           expect(element.textContent).toEqual('this is text');
       });
    });

    describe('events', () => {
        it ('should emit on container click', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox></yoo-form-checkbox>'
            });

            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('checkboxToggled', emitItem);
            await element.querySelector('.icon-container').click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('checked');
        });

        it ('should emit unchecked on container click two times', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormCheckboxComponent],
                html: '<yoo-form-checkbox></yoo-form-checkbox>'
            });

            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('checkboxToggled', emitItem);
            await element.querySelector('.icon-container').click();
            await element.querySelector('.text-container').click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('unchecked');
        });
    });
});
