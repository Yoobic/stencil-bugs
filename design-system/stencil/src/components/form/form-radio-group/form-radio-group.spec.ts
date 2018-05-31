import { TestWindow } from '@stencil/core/testing';
import { YooFormRadioGroupComponent } from './form-radio-group';

describe('YooFormRadioGroupComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormRadioGroupComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('Should render', async () => {
            let element = await window.load({
                components: [YooFormRadioGroupComponent],
                html: '<yoo-form-radio-group class="accent"></yoo-form-radio-group>'
            });
            element.values = [{text: 'radio1'}, {text: 'radio2'}];
            await window.flush(element);
            expect(element).toMatchSnapshot();
           expect(element.values).toHaveLength(2);
        });

        it('Should render with multiple selection', async () => {
            let element = await window.load({
                components: [YooFormRadioGroupComponent],
                html: '<yoo-form-radio-group class="accent" multipleSelction=true></yoo-form-radio-group>'
            });
            element.values = [{text: 'radio1'}, {text: 'radio2'}];
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        describe('Single selection', () => {
            let element = new YooFormRadioGroupComponent();
            element.selectionChanged = {
                emit: () => {}
            };
            beforeEach(async () => {
                element.items = [{text: 'radio1'}, {text: 'radio2'}, {text: 'radio3'}, {text: 'radio4'}];
            });

            it('Should calculate correct item selection', async () => {
                const selectionChangedSpy = jest.spyOn(element.selectionChanged, 'emit');
                let result = [{text: 'radio1', checked: true}, {text: 'radio2', checked: false}, {text: 'radio3', checked: false}, {text: 'radio4', checked: false}];
                element.onRadioClicked(0);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result);
                expect(element.items).toEqual(result);
            });

            it('Should uncheck radio on second click', async () => {
                const selectionChangedSpy = jest.spyOn(element.selectionChanged, 'emit');
                let result1 = [{text: 'radio1', checked: true}, {text: 'radio2', checked: false}, {text: 'radio3', checked: false}, {text: 'radio4', checked: false}];
                let result2 = [{text: 'radio1', checked: false}, {text: 'radio2', checked: false}, {text: 'radio3', checked: false}, {text: 'radio4', checked: false}];
                element.onRadioClicked(0);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result1);
                expect(element.items).toEqual(result1);
                element.onRadioClicked(0);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result2);
                expect(element.items).toEqual(result2);
            });

            it('Should check correct radio on multiple selection', async () => {
                const selectionChangedSpy = jest.spyOn(element.selectionChanged, 'emit');
                let result1 = [{text: 'radio1', checked: true}, {text: 'radio2', checked: false}, {text: 'radio3', checked: false}, {text: 'radio4', checked: false}];
                let result2 = [{text: 'radio1', checked: false}, {text: 'radio2', checked: true}, {text: 'radio3', checked: false}, {text: 'radio4', checked: false}];
                let result3 = [{text: 'radio1', checked: false}, {text: 'radio2', checked: false}, {text: 'radio3', checked: true}, {text: 'radio4', checked: false}];
                let result4 = [{text: 'radio1', checked: false}, {text: 'radio2', checked: false}, {text: 'radio3', checked: false}, {text: 'radio4', checked: true}];
                element.onRadioClicked(0);
                expect(element.items).toEqual(result1);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result1);
                element.onRadioClicked(1);
                expect(element.items).toEqual(result2);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result2);
                element.onRadioClicked(2);
                expect(element.items).toEqual(result3);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result3);
                element.onRadioClicked(3);
                expect(element.items).toEqual(result4);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result4);
            });
        });

        describe('Multiple selection', () => {
            let element = new YooFormRadioGroupComponent();
            element.selectionChanged = {
                emit: () => {}
            };
            beforeEach(async () => {
                element.items = [{text: 'radio1'}, {text: 'radio2'}, {text: 'radio3'}, {text: 'radio4'}];
                element.multipleSelection = true;
            });
            it('Should check correct radio', async () => {
                const selectionChangedSpy = jest.spyOn(element.selectionChanged, 'emit');
                let result1 = [{text: 'radio1', checked: true}, {text: 'radio2'}, {text: 'radio3'}, {text: 'radio4'}];
                element.onRadioClicked(0);
                expect(element.items).toEqual(result1);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result1);
            });
            it('Should check and uncheck correct radio on multiple selection', async () => {
                const selectionChangedSpy = jest.spyOn(element.selectionChanged, 'emit');
                let result1 = [{text: 'radio1', checked: true}, {text: 'radio2'}, {text: 'radio3'}, {text: 'radio4'}];
                let result2 = [{text: 'radio1', checked: true}, {text: 'radio2', checked: true}, {text: 'radio3'}, {text: 'radio4'}];
                let result3 = [{text: 'radio1', checked: true}, {text: 'radio2', checked: true}, {text: 'radio3', checked: true}, {text: 'radio4'}];
                let result4 = [{text: 'radio1', checked: true}, {text: 'radio2', checked: true}, {text: 'radio3', checked: true}, {text: 'radio4', checked: true}];
                let result5 = [{text: 'radio1', checked: false}, {text: 'radio2', checked: true}, {text: 'radio3', checked: true}, {text: 'radio4', checked: true}];
                element.onRadioClicked(0);
                expect(element.items).toEqual(result1);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result1);
                element.onRadioClicked(1);
                expect(element.items).toEqual(result2);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result2);
                element.onRadioClicked(2);
                expect(element.items).toEqual(result3);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result3);
                element.onRadioClicked(3);
                expect(element.items).toEqual(result4);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result4);
                element.onRadioClicked(0);
                expect(element.items).toEqual(result5);
                expect(selectionChangedSpy).toHaveBeenCalledWith(result5);
            });
        });

    });
});
