import { TestWindow } from '@stencil/core/testing';
import { YooFormColorPickerComponent, DEFAULT_COLOR } from './form-color-picker';

describe('YooFormColorPickerComponent', () => {
    it('should build', () => {
        expect(new YooFormColorPickerComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('Should render with no prop', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormColorPickerComponent],
                html: '<yoo-form-color-picker></yoo-form-color-picker>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should render with a color as prop', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormColorPickerComponent],
                html: '<yoo-form-color-picker color="#fa2367"></yoo-form-color-picker>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should render without label', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormColorPickerComponent],
                html: '<yoo-form-color-picker hide-label="true"></yoo-form-color-picker>'
              });
            expect(element).toMatchSnapshot();
        });
    });

    describe('Prop rendering', () => {
        it ('Should re-render when color prop is updated', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormColorPickerComponent],
                html: '<yoo-form-color-picker color="#fa2367"></yoo-form-color-picker>'
              });
            expect(element.color).toEqual('#fa2367');
            element.color = '#aa34aa';
            await window.flush();
            expect(element.color).toEqual('#aa34aa');
            expect(element).toMatchSnapshot();
        });

        it ('Should re-render when hide-label prop is updated', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormColorPickerComponent],
                html: '<yoo-form-color-picker></yoo-form-color-picker>'
              });
            expect(element.hideLabel).toEqual(false);
            element.hideLabel = true;
            await window.flush();
            expect(element.hideLabel).toEqual(true);
            expect(element).toMatchSnapshot();
        });
    });

    describe('Prop Validation', () => {
        it('Should use default color if the color is not a valid color', async () => {
            let element = new YooFormColorPickerComponent();
            element.colorValidation('someColor');
            expect(element.currentColor).toEqual(DEFAULT_COLOR);
            element.colorValidation('wrongColor');
            expect(element.currentColor).toEqual(DEFAULT_COLOR);
        });

        it('Should change color if input is a valid color', async () => {
            let element = new YooFormColorPickerComponent();
            element.colorValidation('#aacc23');
            expect(element.currentColor).toEqual('#aacc23');
        });
    });

   describe('events', () => {
       let element = new YooFormColorPickerComponent();
       element.colorSelected = {
           emit: () => {}
       };

       it('should emit event on input change', () => {
        let res = '#aacc23';
        const colorSelectedSpy = jest.spyOn(element.colorSelected, 'emit');
        element.onInputChange({target: {value: '#aacc23'}});
        expect(element.currentColor).toEqual(res);
        expect(colorSelectedSpy).toHaveBeenCalledWith(res);
       });
   });
});
