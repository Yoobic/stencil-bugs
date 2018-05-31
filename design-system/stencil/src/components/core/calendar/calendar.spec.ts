
import { TestWindow } from '@stencil/core/testing';
import { YooCalendarComponent } from './calendar';

xdescribe('CalendarComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooCalendarComponent()).toBeTruthy();
    });

    describe('Rendering', () => {

        it ('Should render with the current active day', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it ('Should render with markers', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            element.markers = [{ _id: '2018-05-08', count: 3 }, { _id: '2018-05-09', count: 2 }, { _id: '2018-05-10', count: 1 }];
            await window.flush();
            expect(element.querySelectorAll('.marker')).toHaveLength(3);
            expect(element).toMatchSnapshot();
        });
        it ('Should render with extra markers', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            element.extraMarkers = [{ _id: '2018-05-08', count: 3 }, { _id: '2018-05-09', count: 2 }, { _id: '2018-05-10', count: 1 }];
            await window.flush();
            expect(element.querySelectorAll('.marker.extra')).toHaveLength(3);
            expect(element).toMatchSnapshot();
        });
        it ('Should render with markers with no count', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            element.markersNoCount = [{ _id: '2018-05-08'}, { _id: '2018-05-09'}];
            await window.flush();
            expect(element.querySelectorAll('.marker.no-count')).toHaveLength(2);
            expect(element).toMatchSnapshot();
        });
        it ('Should have the correct number of grey days for the specified month', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            await window.flush();
            expect(element.querySelectorAll('.day.grey-day')).toHaveLength(4);
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {
        let emitEvent = jest.fn();

        it('Should emit the selected day when clicked', async () => {
            let element = await window.load({
                components: [YooCalendarComponent],
                html: '<yoo-calendar></yoo-calendar>'
            });
            element.activeDay = new Date('Wed May 08 2018 00:00:00 UTC+0000');
            await window.flush();
            window.document.addEventListener('dateChanged', emitEvent);
            let weekDiv = element.querySelector('.week');
            let dateDiv = weekDiv.querySelector('.day');
            await dateDiv.click();
            expect(emitEvent).toHaveBeenCalled();
        });
    });
});