import { TestWindow } from '@stencil/core/testing';
import { YooFormInputComponent } from './form-input';

import { generateEvent, inputFieldValue } from '../../../../test';

fdescribe('YooFormInputComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormInputComponent()).toMatchSnapshot();
    });

    describe('rendering', () => {
        beforeEach( async () => {
        });
        it ('should render simple text input', async () => {
            let element = await window.load({
                components: [YooFormInputComponent],
                html: '<yoo-form-input></yoo-form-input>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should render email input', async () => {
            let element = await window.load({
                components: [YooFormInputComponent],
                html: '<yoo-form-input type="email"></yoo-form-input>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should render with tooltip', async () => {
            let element = await window.load({
                components: [YooFormInputComponent],
                html: '<yoo-form-input tooltip="This is a tooltip"></yoo-form-input>'
            });
            expect(element).toMatchSnapshot();
        });

    });

  describe('input events', () => {
    let element, res, input;

    beforeEach( async () => {
      element = await window.load({
        components: [YooFormInputComponent],
        html: '<yoo-form-input label placeholder="my placeholder" placeholdertolabel="true"></yoo-form-input>'
      });
      input = element.querySelector('input');
    });

    it('should emit inputChanged ', async () => {
        let inputSpy = jest.fn(ev => {res = ev.detail; });
        window.document.addEventListener('inputChanged', inputSpy);
        const value = 'This is input value';
        inputFieldValue(input, value);
        expect(inputSpy).toHaveBeenCalled();
        expect(res).toEqual(value);
    });

    it('should show and hide label on blur and focus ', async () => {
        let blurSpy = jest.fn(ev => {res = ev.detail; });
        let focusSpy = jest.fn(ev => {res = ev.detail; });
        window.document.addEventListener('inputBlurred', blurSpy);
        window.document.addEventListener('inputFocused', focusSpy);
        expect(element.querySelector('.placeholderlabel')).toBeTruthy();

        await input.dispatchEvent(generateEvent(window, 'focus'));
        window.flush();
        expect(focusSpy).toHaveBeenCalled();
        await input.dispatchEvent(generateEvent(window, 'blur'));
        window.flush();
        expect(blurSpy).toHaveBeenCalled();
        expect(element.querySelector('.placeholderlabel')).toBeTruthy();
    });

  });
});
