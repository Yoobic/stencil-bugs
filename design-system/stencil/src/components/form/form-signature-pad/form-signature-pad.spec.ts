import { TestWindow } from '@stencil/core/testing';
import { YooFormSignaturePadComponent } from './form-signature-pad';

jest.mock('signature_pad');

describe('YooSignaturePadComponent', () => {

    describe('Method', () => {
        let element;
        beforeEach(async () => {
            element = new YooFormSignaturePadComponent();
            // element = await render({
            //   components: [YooSignaturePadComponent],
            //   html: '<yoo-form-signature-pad></yoo-form-signature-pad>'
            // });//
        });
        it('should build', async () => {
            expect(element).toBeTruthy();
        });

        xit('Should clean', async () => {
            element.onClear();
            expect(element).toBeTruthy();
        });
    });

    xdescribe('Snapshots', () => {
        it('Should render', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooFormSignaturePadComponent],
                html: '<yoo-form-signature-pad></yoo-form-signature-pad>'
            });

            expect(element).toMatchSnapshot();
        });

    });
});
