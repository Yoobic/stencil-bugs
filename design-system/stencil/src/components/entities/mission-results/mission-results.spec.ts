import { TestWindow } from '@stencil/core/testing';
import { YooMissionResultsComponent } from './mission-results';

describe('MissionResultsComponent', () => {
    it('should build', () => {
        expect(new YooMissionResultsComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooMissionResultsComponent],
                html: '<yoo-mission-results></yoo-mission-results>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });
    });
});