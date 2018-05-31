import { TestWindow } from '@stencil/core/testing';
import { YooCardListComponent } from './card-list';

describe('CardListComponent', () => {
    it('should build', () => {
        expect(new YooCardListComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooCardListComponent],
                html: '<yoo-card-list></yoo-card-list>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it('Should render with props', async () => {
            element.subheadings = ['subtitle 1', 'subtitle 2'];
            element.badges = [{text: 'Finished', icon: 'yo-home'}, {text: 'In-Progress'}];
            element.imgSrc = 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg';
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render with props and a single user', async () => {
            element.subheadings = ['subtitle 1', 'subtitle 2'];
            element.badges = [{text: 'Finished', icon: 'yo-home'}, {text: 'In-Progress'}];
            element.imgSrc = 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg';
            element.users = [{imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        describe('Should render multiple users properly', () => {
            it('Should render with props and 2 users', async () => {
                element.subheadings = ['subtitle 1', 'subtitle 2'];
                element.badges = [{text: 'Finished', icon: 'yo-home'}, {text: 'In-Progress'}];
                element.imgSrc = 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg';
                element.users = [{imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}];
                await window.flush();
                expect(element).toMatchSnapshot();
            });
            it('Should render with props and 3 users', async () => {
                element.subheadings = ['subtitle 1', 'subtitle 2'];
                element.badges = [{text: 'Finished', icon: 'yo-home'}, {text: 'In-Progress'}];
                element.users = [{imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}];
                element.imgSrc = 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg';
                await window.flush();
                expect(element).toMatchSnapshot();
            });
            it('Should render with props and multiple users', async () => {
                element.subheadings = ['subtitle 1', 'subtitle 2'];
                element.badges = [{text: 'Finished', icon: 'yo-home'}, {text: 'In-Progress'}];
                element.users = [{imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}, {imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg'}];
                element.imgSrc = 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg';
                await window.flush();
                expect(element).toMatchSnapshot();
            });
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