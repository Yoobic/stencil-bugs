import { TestWindow } from '@stencil/core/testing';
import { YooFormStarRatingComponent } from './form-star-rating';

describe('Yoo Form Star rating Component', () => {
  let window;
  beforeEach(() => {
    window = new TestWindow();
  });
  it('Should Build', async () => {
      let element = new YooFormStarRatingComponent();
      expect(element).toBeTruthy();
  });

  xdescribe('Rendering', () => {
      it('Should render with a correct structure', async () => {
          let element = await window.load({
              components: [YooFormStarRatingComponent],
              html: '<yoo-form-star-rating></yoo-form-star-rating>'
            });
          expect(element).toMatchSnapshot();
      });

      it('Should render with a specific star number', async () => {
          let element = await window.load({
              components: [YooFormStarRatingComponent],
              html: '<yoo-form-star-rating stars="7"></yoo-form-star-rating>'
            });
          expect(element).toMatchSnapshot();
      });

  });

  xdescribe('Re-rendering', () => {

      it('Should re-render when star number is updated', async () => {
          let element = await window.load({
              components: [YooFormStarRatingComponent],
              html: '<yoo-form-star-rating stars="7"></yoo-form-star-rating>'
            });
          expect(element.stars).toEqual(7);
          element.stars = 8;
          await window.flush();
          expect(element).toMatchSnapshot();
      });
  });

  describe('Events', () => {
    let element, res, emitEvent;
      it('Should change the stars and emit changed on click', async () => {
        element = await window.load({
            components: [YooFormStarRatingComponent],
            html: '<yoo-form-star-rating stars="5"></yoo-form-star-rating>'
        });
        emitEvent = jest.fn(ev => { res = ev.detail; });
        window.document.addEventListener('inputChanged', emitEvent);
        let star1: HTMLElement = element.querySelector('.star-container > i');
        //expect(star1.classList).toContain('yo-star');
        await star1.click();
        expect(emitEvent).toHaveBeenCalled();
        expect(res).toEqual(1);
        // expect(emitEvent).toHaveEventData(1);
      });

  });
});
