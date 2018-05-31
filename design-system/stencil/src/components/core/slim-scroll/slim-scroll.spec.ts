let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers', () => {
  return {
    getElementDimensions: mockDimensions
  };
});
import { TestWindow } from '@stencil/core/testing';
import { YooSlimScrollComponent } from './slim-scroll';

describe('YooSlimScrollComponent', () => {
  it('should build', () => {
      expect(new YooSlimScrollComponent()).toBeTruthy();
  });

  describe('Rendering', () => {
      let window;
      beforeEach(() => {
        window = new TestWindow();
        mockDimensions.mockImplementation(() => {
          return {width: 1000, height: 100};
        });
      });
      it('Should render with a basic structure', async () => {
          let element = await window.load({
              components: [YooSlimScrollComponent],
              html: '<yoo-slim-scroll></yoo-slim-scroll>'
          });
          expect(element).toMatchSnapshot();
      });
      it('Should render with a slot', async () => {
          let element = await window.load({
              components: [YooSlimScrollComponent],
              html: `<yoo-slim-scroll>
                          <div>
                              <p>Hola this is a scrollable content in a Slim Scroll</p>
                              <yoo-badge text="SLIM" class="danger"></yoo-badge>
                          </div>
                      </yoo-slim-scroll>`
          });
          expect(element).toMatchSnapshot();
      });

      it('Should call getStyleContainer on re-rendering', async () => {
          let element = new YooSlimScrollComponent();
          element.getStyleContainer = jest.fn();
          await element.render();
          expect(element.getStyleContainer).toHaveBeenCalled();
      });
  });

  describe('Methods ', () => {
      describe('GetStyleContainer should work properly', () => {

          it('Should work without specifying height and width', async () => {
              let element = new YooSlimScrollComponent();
              expect(element.getStyleContainer()['max-height']).toEqual(window.innerHeight + 'px');
          });

          it('Should work with height and width', async () => {
              let element = new YooSlimScrollComponent();
              element.height = '150px';
              element.width = '70%';
              expect(element.getStyleContainer().height).toEqual('150px');
              expect(element.getStyleContainer().width).toEqual('70%');
              expect(element.getStyleContainer()['max-height']).toEqual(window.innerHeight + 'px');
              //wexpect(element.getStyleContainer()['max-width']).toEqual(window.innerWidth + 'px');
          });
      });
  });
});
