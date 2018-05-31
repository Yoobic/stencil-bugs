import { TestWindow } from '@stencil/core/testing';
import { YooCardFileComponent } from './card-file';

describe('CardFileComponent', () => {
    it('should build', () => {
        expect(new YooCardFileComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooCardFileComponent],
                html: '<yoo-card-file></yoo-card-file>'
            });
        });

        it ('Should render with icon', async () => {
            element.icon = 'yo-file-word';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with iconClass', async () => {
            element.icon = 'yo-file-word';
            element.iconClass = 'accent';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with heading', async () => {
            element.heading = 'My long title document.docx';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with subheading', async () => {
            element.subheading = '3.3 Mb';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with isClosable', async () => {
            element.isClosable = true;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    // describe('Events', () => {

    //     let emitEvent, window;
    //     beforeEach( async () => {
    //         window = new TestWindow();
    //         emitEvent = jest.fn();
    //     });
    // });
});