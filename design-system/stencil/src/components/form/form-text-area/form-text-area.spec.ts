import { TestWindow } from '@stencil/core/testing';
import { YooFormTextAreaComponent } from './form-text-area';

import { generateEvent, inputFieldValue } from '../../../../test';


describe('FormTextAreaComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });

    it('should build', () => {
        expect(new YooFormTextAreaComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        let element;

        it ('Should render', async () => {
            element = await window.load({
                components: [YooFormTextAreaComponent],
                html: '<yoo-form-text-area></yoo-form-text-area>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should render with a placeholder', async () => {
            element = await window.load({
                components: [YooFormTextAreaComponent],
                html: '<yoo-form-text-area placeholder="placeholder"></yoo-form-text-area>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should render with text', async () => {
            element = await window.load({
                components: [YooFormTextAreaComponent],
                html: '<yoo-form-text-area value="text"></yoo-form-text-area>'
            });
            expect(element).toMatchSnapshot();
        });

    });

    describe('Events', () => {

        let element, res, input;

        beforeEach( async () => {
            element = await window.load({
                components: [YooFormTextAreaComponent],
                html: '<yoo-form-text-area></yoo-form-text-area>'
            });
            input = element.querySelector('textarea');
        });

        it('should emit inputChanged', async() => {
            let inputSpy = jest.fn(ev => {res = ev.detail; });
           window.document.addEventListener('inputChanged', inputSpy);
           const value = 'Text area input value';
           inputFieldValue(input, value);
           expect(inputSpy).toHaveBeenCalled();
           expect(res).toEqual(value);
        });

        it(' should emit blur and focus event', async () => {
            let blurSpy = jest.fn(ev => {res = ev.detail; });
            let focusSpy = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('inputBlurred', blurSpy);
            window.document.addEventListener('inputFocused', focusSpy);
            await input.dispatchEvent(generateEvent(window, 'focus'));
            window.flush();
            expect(focusSpy).toHaveBeenCalled();
            await input.dispatchEvent(generateEvent(window, 'blur'));
            window.flush();
            expect(blurSpy).toHaveBeenCalled();
        });
    });
});