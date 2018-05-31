import { TestWindow } from '@stencil/core/testing';
import { YooFormInputGameComponent } from './form-input-game';

describe('YooFormInputGameComponent', () => {
  let window;
  beforeEach(() => {
    window = new TestWindow();
  });
  it('Should build', () => {
      expect(new YooFormInputGameComponent()).toBeTruthy();
  });

  describe('Rendering', () => {
      it ('Should render', async () => {
          let element = await window.load({
              components: [YooFormInputGameComponent],
              html: '<yoo-form-input-game></yoo-form-input-game>'
            });
          expect(element).toMatchSnapshot();
      });

      it('Should render with a name prop', async () => {
          let element = await window.load({
              components: [YooFormInputGameComponent],
              html: '<yoo-form-input-game name="Runner" ></yoo-form-input-game>'
            });
          expect(element).toMatchSnapshot();
      });

      it('Should render with a name prop', async () => {
          let element = await window.load({
              components: [YooFormInputGameComponent],
              html: '<yoo-form-input-game field-id="game-field-id" name="Runner" ></yoo-form-input-game>'
            });
          expect(element.fieldId).toEqual('game-field-id');
          expect(element).toMatchSnapshot();
      });

      it('Should receive phaser as a prop', async () => {
          let element = await window.load({
              components: [YooFormInputGameComponent],
              html: '<yoo-form-input-game phaser="phaser"></yoo-form-input-game>'
            });
          expect(element.phaser).toEqual('phaser');
          expect(element).toMatchSnapshot();
      });
  });
  describe('events', () => {
    it ('should emit gameOver', async () => {
      let element = new YooFormInputGameComponent();
      element.gameOver = {
        emit: () => {}
      };
      const changedSpy = jest.spyOn(element.gameOver, 'emit');
      element.isGameOver = true;
      element.componentWillUpdate();
      expect(changedSpy).toHaveBeenCalledWith(true);
    });
  });
});
