import { TestWindow } from '@stencil/core/testing';
import { YooFormRadioComponent } from './form-radio';

describe('YooFormRadioComponent', () => {
  let window;
  beforeEach(() => {
    window = new TestWindow();
  });
  it('should build', () => {
        expect(new YooFormRadioComponent()).toBeTruthy();
  });

  describe('Snapshots', () => {
      it('Should render', async () => {
          let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio class="accent"></yoo-form-radio>'
          });
          expect(element).toMatchSnapshot();
      });

      it('Should have text content', async () => {
          let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio text="this is a radio" class="accent"></yoo-form-radio>'
          });
          expect(element).toMatchSnapshot();
      });

      it('Should have starting state checked', async () => {
          let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio state="checked" class="accent"></yoo-form-radio>'
          });
          expect(element).toMatchSnapshot();
      });

       it('Should be disbaled', async () => {
          let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio disabled="true" ></yoo-form-radio>'
          });
          expect(element).toMatchSnapshot();
      });

  });

  describe('rendering', () => {
      it('should render text content', async () => {
          let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio text="this is a radio" class="accent"></yoo-form-radio>'
          });
          expect(element.textContent).toEqual('this is a radio');
      });

       it('should re-render when state is updated', async () => {
         let element = await window.load({
              components: [YooFormRadioComponent],
              html: '<yoo-form-radio text="this is a radio" class="accent"></yoo-form-radio>'
         });
         expect(element.state).toEqual('unchecked');
         element.state = 'checked';
         await window.flush();
         expect(element.state).toEqual('checked');
      });
  });

  describe('events', () => {
    let element, res, emitEvent;
    beforeEach( async () => {
      element = await window.load({
        components: [YooFormRadioComponent],
        html: '<yoo-form-radio class="accent"></yoo-form-radio>'
      });
      emitEvent = jest.fn(ev => { res = ev.detail; });
    });
    it ('should emit radioClicked on click', async () => {
      window.document.addEventListener('radioClicked', emitEvent);
      await element.querySelector('.icon-container').click();
      expect(emitEvent).toHaveEventData('checked');
      await element.querySelector('.text-container').click();
      expect(emitEvent).toHaveBeenCalled();
      expect(res).toEqual('unchecked');
      // expect(emitEvent).toHaveEventData('unchecked');
    });
  });
});
