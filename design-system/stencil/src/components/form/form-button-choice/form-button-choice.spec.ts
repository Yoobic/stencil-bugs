import { TestWindow } from '@stencil/core/testing';
import { YooFormButtonChoiceComponent } from './form-button-choice';

describe('Form Button Choice', () => {

    it('Should build', async () => {
        let element = new YooFormButtonChoiceComponent();
        expect(element).toBeTruthy();
    });

    describe('Rendering', () => {
        it('Should render with values', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormButtonChoiceComponent],
                html: '<yoo-form-button-choice></yoo-form-button-choice>'
              });
            element.values = ['az', 'oz', 'salut', 'bonjour', 'hi', 'max', 'min', 'chocolat'];
            await window.flush();
            expect(element.values).toEqual(['az', 'oz', 'salut', 'bonjour', 'hi', 'max', 'min', 'chocolat']);
            expect(element).toMatchSnapshot();
        });

        it('Should render with multiple prop', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormButtonChoiceComponent],
                html: '<yoo-form-button-choice multiple="true"></yoo-form-button-choice>'
              });
            expect(element.multiple).toEqual(true);
            expect(element).toMatchSnapshot();
        });

        it('Should have few item class when values < 5', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormButtonChoiceComponent],
                html: '<yoo-form-button-choice></yoo-form-button-choice>'
              });
            element.values = ['az', 'oz', 'salut', 'bonjour'];
            await window.flush();
            let divGrid = element.querySelector('.grid-container');
            expect(divGrid.classList).toContain('few-items');
        });

        it('Should not have few item class when values > 4', async () => {
            let window = new TestWindow();
                let element = await window.load({
                components: [YooFormButtonChoiceComponent],
                html: '<yoo-form-button-choice></yoo-form-button-choice>'
              });
            element.values = ['az', 'oz', 'salut', 'bonjour', 'saluttt'];
            await window.flush();
            let divGrid = element.querySelector('.grid-container');
            expect(divGrid.classList).not.toContain('few-items');
        });

        describe('With selected elements', () => {

            it('Should render with a pre selected element', async () => {
                let window = new TestWindow();
                let element = await window.load({
                    components: [YooFormButtonChoiceComponent],
                    html: '<yoo-form-button-choice></yoo-form-button-choice>'
                  });
                element.values = ['az', 'oz', 'salut', 'bonjour', 'saluttt'];
                element.selected = [true, false, false, false, false];
                await window.flush();
                expect(element).toMatchSnapshot();
            });

            it('Should render with to much selected elements and unselect them all', async () => {
                let window = new TestWindow();
                let element = await window.load({
                    components: [YooFormButtonChoiceComponent],
                    html: '<yoo-form-button-choice></yoo-form-button-choice>'
                  });
                element.values = ['az', 'oz', 'salut', 'bonjour', 'saluttt'];
                element.selected = [true, false, true, false, false];
                await window.flush();
                expect(element.selected.filter(val => val)).toHaveLength(0);
                expect(element).toMatchSnapshot();
            });

            it('Should render with pre selected element in multiple choice', async () => {
                let window = new TestWindow();
                let element = await window.load({
                    components: [YooFormButtonChoiceComponent],
                    html: '<yoo-form-button-choice multiple="true"></yoo-form-button-choice>'
                  });
                element.values = ['az', 'oz', 'salut', 'bonjour', 'saluttt'];
                element.selected = [true, false, true, false, true];
                await window.flush();
                expect(element).toMatchSnapshot();
            });

        });
    });

    describe('Component logic', () => {
        let element;
        beforeEach(async () => {
            element = new YooFormButtonChoiceComponent();
            element.inputChanged = {emit: jest.fn()};
        });

        it('Should create an array of the same length to store item state', async () => {
            element.values = ['a', 'b', 'c', 'd', 'e'];
            element.selectedUpdater();
            expect(element.selected).toHaveLength(5);
            expect(element.selected.filter((val) => val ? true : false)).toHaveLength(0);
        });

        it('Should only select one item if not multiple', async () => {
            element.values = ['a', 'b', 'c', 'd'];
            element.selectedUpdater();
            expect(element.selected).toEqual([false, false, false, false]);
            element.clickChoice(0);
            expect(element.selected).toEqual([true, false, false, false]);
            element.clickChoice(2);
            expect(element.selected).toEqual([false, false, true, false]);
            element.clickChoice(3);
            expect(element.selected).toEqual([false, false, false, true]);
        });

        it('Should be able to select several item if multiple is true', async () => {
            element.values = ['a', 'b', 'c', 'd'];
            element.multiple = true;
            element.selectedUpdater();
            expect(element.selected).toEqual([false, false, false, false]);
            element.clickChoice(0);
            expect(element.selected).toEqual([true, false, false, false]);
            element.clickChoice(2);
            expect(element.selected).toEqual([true, false, true, false]);
            element.clickChoice(3);
            expect(element.selected).toEqual([true, false, true, true]);
            element.clickChoice(0);
            expect(element.selected).toEqual([false, false, true, true]);
            element.clickChoice(3);
            expect(element.selected).toEqual([false, false, true, false]);
            element.clickChoice(1);
            expect(element.selected).toEqual([false, true, true, false]);
        });
    });

  describe('events', () => {
      let window, element, res, emitEvent;
      beforeEach( async () => {
        window = new TestWindow();
        element = await window.load({
          components: [YooFormButtonChoiceComponent],
            html: '<yoo-form-button-choice></yoo-form-button-choice>'
        });
        element.values = ['az', 'oz', 'salut', 'bonjour', 'hi', 'max', 'min', 'chocolat'];
        await window.flush();
        emitEvent = jest.fn(ev => { res = ev.detail; });
      });


    it ('should emit changed on choice-container click', async () => {
        window.document.addEventListener('inputChanged', emitEvent);
        let button = element.querySelector('.choice-container');
        await button.click();
        expect(emitEvent).toHaveBeenCalled();
        expect(res).toEqual([element.values[0]]);
    });
  });
});
