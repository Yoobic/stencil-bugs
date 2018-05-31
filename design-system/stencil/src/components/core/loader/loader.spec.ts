import { TestWindow } from '@stencil/core/testing';
import { YooLoaderComponent } from './loader';
jest.mock('../../../utils/anim');

describe('YooLoaderComponent', () => {
    it('should build', () => {
        expect(new YooLoaderComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('Should render', async () => {
          let window = new TestWindow();
          let element = await window.load({
                components: [YooLoaderComponent],
                html: '<yoo-loader></yoo-loader>'
              });
            expect(element).toMatchSnapshot();
        });
    });
});
