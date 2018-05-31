import { TestWindow } from '@stencil/core/testing';
import { YooActionSheetComponent } from './action-sheet';
import { IActionSheetButton } from '@shared/interfaces';

jest.mock('../../../utils/anim');

describe('YooActionSheetComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooActionSheetComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should render an empty action sheet', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet></yoo-action-sheet>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('Should render a heading', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet heading="Action Sheet"></yoo-action-sheet>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should render a heading and an action button', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet heading="Action Sheet"></yoo-action-sheet>'
            });
            let buttons: IActionSheetButton = {text: 'Action 2', icon: 'yo-fire', cssClass: 'success'};
            element.buttons = buttons;
            await window.flush();
            expect(element).toMatchSnapshot();
        });

         it ('Should render a heading and action buttons', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet heading="Action Sheet"></yoo-action-sheet>'
            });
            let buttons: IActionSheetButton[] = [{text: 'Action 1', icon: 'yo-fire', cssClass: 'success'}, {text: 'Action 2', icon: 'yo-fire', cssClass: 'success'}];
            element.buttons = buttons;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it ('should not close action sheet on disabled button', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet heading="Action Sheet"></yoo-action-sheet>'
            });
            let buttons: IIActionSheetButton[] = [{text: 'Action 1', icon: 'yo-fire', cssClass: 'success', disabled: true}];
            element.buttons = buttons;
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.getElementsByClassName('action-sheet')).toHaveLength(1);
            let yooButton = element.querySelector('.inner-container');
            await yooButton.click();
            expect(element.getElementsByClassName('action-sheet')).toHaveLength(1);
        });
    });

    describe('Events', () => {

        it('Should fire action sheet closed event on click on action button', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet></yoo-action-sheet>'
            });
            let buttons: IActionSheetButton[] = [{text: 'Action 1', icon: 'yo-fire', cssClass: 'success'}, {text: 'Action 2', icon: 'yo-fire', cssClass: 'success'}];
            element.buttons = buttons;
            await window.flush();

            let button: HTMLElement = element.querySelector('.inner-container');
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('actionSheetClosed', emitItem);
            await button.click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(true);
        });

        it('Should fire an event when an action button is clicked', async () => {
            let element = await window.load ({
                components: [YooActionSheetComponent],
                html: '<yoo-action-sheet></yoo-action-sheet>'
            });
            let buttons: IActionSheetButton[] = [{text: 'Action 1', icon: 'yo-fire', cssClass: 'success'}, {text: 'Action 2', icon: 'yo-fire', cssClass: 'success'}];
            element.buttons = buttons;
            await window.flush();

            let yooButtons: HTMLElement[] = element.querySelectorAll('.inner-container');
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('actionSelected', emitItem);
            await yooButtons[0].click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('Action 1');
            await yooButtons[1].click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('Action 2');
        });
    });

});
