import { TestWindow } from '@stencil/core/testing';
import { YooFormRangeComponent } from './form-range';

describe('YooFormInputComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormRangeComponent()).toMatchSnapshot();
    });

    describe('rendering', () => {
        beforeEach( async () => {
        });
        it ('should render simple text input', async () => {
            let element = await window.load({
                components: [YooFormRangeComponent],
                html: '<yoo-form-range></yoo-form-range>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should render simple text input', async () => {
            let element = await window.load({
                components: [YooFormRangeComponent],
                html: '<yoo-form-range></yoo-form-range>'
            });
            element.value = {inf: 11, sup: 38};
            element.min = 0;
            element.max = 100;
            element.double = true;
            expect(element).toMatchSnapshot();
        });

        it ('should render simple text input', async () => {
            let element = await window.load({
                components: [YooFormRangeComponent],
                html: '<yoo-form-range></yoo-form-range>'
            });
            element.value = {inf: 11, sup: 38};
            element.min = 0;
            element.max = 100;
            element.double = false;
            expect(element).toMatchSnapshot();
        });
    });

});

