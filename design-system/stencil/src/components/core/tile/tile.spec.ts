import { TestWindow } from '@stencil/core/testing';
import { YooTileComponent } from './tile';

describe('TileComponent', () => {
    it('should build', () => {
        expect(new YooTileComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooTileComponent],
                html: '<yoo-tile></yoo-tile>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
        it('Should render with text', async () => {
            element.text = 'ONGOING MISSIONS';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with textClass', async () => {
            element.textClass = 'gradient-success';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with value', async () => {
            element.value = '5';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with icon', async () => {
            element.icon = 'yo-activity';
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