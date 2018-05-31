import { TestWindow } from '@stencil/core/testing';
import { YooFormSliderComponent } from './form-slider';

describe('YooFormSliderComponent', () => {
  let window;
  beforeEach(() => {
    window = new TestWindow();
  });
  it('should build', () => {
      expect(new YooFormSliderComponent()).toBeTruthy();
  });

  describe('Rendering', () => {
      it ('Should have initial value displayed', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider class="accent" initial-value="34"></yoo-form-slider>'
            });
          expect(element).toMatchSnapshot();
      });

      it ('Should have label hidden', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider hide-label="true" class="accent" initial-value="34"></yoo-form-slider>'
            });
          expect(element).toMatchSnapshot();
      });

      it ('Should have references hidden', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider hide-references="true" class="accent" initial-value="34"></yoo-form-slider>'
            });
          expect(element).toMatchSnapshot();
      });

      it ('Should have a double slider', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider double-slider="true" class="accent" initial-value="34"></yoo-form-slider>'
            });
          expect(element).toMatchSnapshot();
      });

      it ('Should have a double slider inline', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider double-slider="true" class="inline accent" initial-value="34"></yoo-form-slider>'
            });
          expect(element).toMatchSnapshot();
      });

      describe('State Validation', async() => {
          it('Should change value only if initial Value between bounds', async () => {
              let element = await window.load({
                  components: [YooFormSliderComponent],
                  html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
                  });
              expect(element.initialValue).toEqual(34);
              expect(element.maximum).toEqual(100);
              expect(element.minimum).toEqual(0);
              element.initialValue = 125;
              await window.flush();
              expect(element).toMatchSnapshot();
              element.value = -125;
              await window.flush();
              expect(element).toMatchSnapshot();
          });
      });
  });
  describe('Re-Rendering', () => {
      it('Should re-render when initial value is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.initialValue).toEqual(34);
        element.initialValue = 98;
        await window.flush();
        expect(element.initialValue).toEqual(98);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when maximum is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.maximum).toEqual(100);
        element.maximum = 357;
        await window.flush();
        expect(element.maximum).toEqual(357);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when minimum is updated', async () => {
          let element = await window.load({
              components: [YooFormSliderComponent],
              html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
              });
          expect(element.minimum).toEqual(0);
          element.minimum = -357;
          await window.flush();
          expect(element.minimum).toEqual(-357);
          expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when disabled is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.disabled).toEqual(false);
        element.disabled = true;
        await window.flush();
        expect(element.disabled).toEqual(true);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when hideLabel is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.hideLabel).toEqual(false);
        element.hideLabel = true;
        await window.flush();
        expect(element.hideLabel).toEqual(true);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when hideReferences is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.hideReferences).toEqual(false);
        element.hideReferences = true;
        await window.flush();
        expect(element.hideReferences).toEqual(true);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });

      it('Should re-render when doubleSlider is updated', async () => {
        let element = await window.load({
            components: [YooFormSliderComponent],
            html: '<yoo-form-slider initial-value="34"></yoo-form-slider>'
            });
        expect(element.doubleSlider).toEqual(false);
        element.doubleSlider = true;
        await window.flush();
        expect(element.doubleSlider).toEqual(true);
        expect(element).toBeTruthy();
        expect(element).toMatchSnapshot();
      });
  });
  describe('events', () => {
    let element;
    beforeEach( async () => {
      element = new YooFormSliderComponent();
      element.value = 1337;
    });
    it ('should emit singleSliderChanged', async () => {
      element.singleSliderChanged = {
        emit: () => {}
      };
      const changedSpy = jest.spyOn(element.singleSliderChanged, 'emit');
      element.handleEvent();
      expect(changedSpy).toHaveBeenCalledWith(1337);
    });
    it ('should emit doubleSliderChanged', async () => {
      element.doubleSliderChanged = {
        emit: () => {}
      };
      const changedSpy = jest.spyOn(element.doubleSliderChanged, 'emit');
      element.doubleSlider = true;
      element.secondValue = 42;
      element.handleEvent();
      expect(changedSpy).toHaveBeenCalledWith({lowValue: 42, highValue: 1337});
    });
  });
});
