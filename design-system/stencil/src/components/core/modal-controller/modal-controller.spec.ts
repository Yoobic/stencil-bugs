import { TestWindow } from '@stencil/core/testing';
jest.mock('../../../utils/anim');
import { YooModalControllerComponent } from './modal-controller';
import { YooActionSheetComponent } from '../action-sheet/action-sheet';
import { YooAlertComponent } from '../alert/alert';
import { YooModalComponent } from '../modal/modal';

describe('YooModalControllerComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooModalControllerComponent()).toBeTruthy();
    });

    describe('Generate Component to display', () => {
        it ('should create a single modal with header and footer', async () => {
            let element = new YooModalControllerComponent();
            element.generateModal({
                heading: 'Gutten Morgen',
                hasFooter: true
            });
            expect(element.element).toBeTruthy();

            let modal = await window.load({
                components: [YooModalComponent],
                html: element.element.outerHTML
            });
            expect(modal).toMatchSnapshot();
        });

        it ('should populate a single modal with header', async () => {
            let modalController = new YooModalControllerComponent();

            let element = document.createElement('yoo-modal');
            let htmlElement = document.createElement('div');
            htmlElement.innerHTML = `<div class="test">This is the test text</div>`;
            element.heading = 'heading';
            element.hasHeader = true;
            element.content = htmlElement;

            let modal = await window.load({
                components: [YooModalComponent],
                html: element.outerHTML
            });

            modalController.populateModal(modal);
            expect(modal).toMatchSnapshot();
        });

        it ('should generate a confirm modal', async () => {
            let modalController = new YooModalControllerComponent();

            modalController.confirm();


            let modal = await window.load({
                components: [YooModalComponent],
                html: modalController.element.outerHTML
            });

            expect(modal.className).toContain('accent');
            expect(modal).toMatchSnapshot();
        });

        it ('should create a single toast alert', async () => {
            let element = new YooModalControllerComponent();
            element.generateAlert({heading: 'Toast Alert',
                text: 'An alert has been launched !',
                closeable: true,
                cssClass: 'toast modal accent'});
            expect(element.element).toBeTruthy();

            let alert = await window.load({
                components: [YooAlertComponent],
                html: element.element.outerHTML
            });
            expect(alert).toMatchSnapshot();
        });

        it ('should create an action sheet', async () => {
            let element = new YooModalControllerComponent();
            element.generateActionSheet({
                heading: 'Action sheet',
                buttons: [{text: 'Action 1', cssClass: 'accent'}, {text: 'Action 2', icon: 'yo-fire', cssClass: 'success'}]
            });
            expect(element.element).toBeTruthy();

            let actionSheet = await window.load({
                components: [YooActionSheetComponent],
                html: element.element.outerHTML
            });
            expect(actionSheet).toMatchSnapshot();
        });
    });
    //TODO: Event test
  // describe('events', () => {
  //   let element, res, emitEvent;
  //   beforeEach( async () => {
  //     element = new YooModalControllerComponent();
  //     emitEvent = jest.fn(ev => { res = ev.detail; });
  //   });
  //   it ('should emit modalCtrlPrimaryButtonClicked', async () => {
  //     element.modalCtrlPrimaryButtonClicked = {
  //       emit: () => {}
  //     };
  //     const changedSpy = jest.spyOn(element.modalCtrlPrimaryButtonClicked, 'emit');
  //     element.primaryClick();
  //     expect(changedSpy).toHaveBeenCalledWith(24);
  //   });
  // });
});
