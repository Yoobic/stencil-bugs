import { TestWindow } from '@stencil/core/testing';
import { YooCardFeedComponent } from './card-feed';

//jest.mock('../../../utils/helpers/helpers');
let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers/helpers', () => {
    return {
        getElementDimensions: mockDimensions
    };
});

xdescribe('YooCardFeedComponent', () => {
    it('should build', () => {
        expect(new YooCardFeedComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooCardFeedComponent],
                html: '<yoo-card-feed></yoo-card-feed>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it('Should render with an entry', async () => {
            const entry = {
                heading: 'Jerome barber',
                description: 'New photo shooting. This is extremely cool ! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                topLeftBadge: 'PDF',
                bottomLeftIcon: 'yo-trophy',
                imgSrc: 'https://blog.shelvingdesignsystems.com/hs-fs/hub/218229/file-22618644-jpg/images/make_the_most_of_retail_displays.jpg?t=1523455671276',
                icon: 'https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg',
                subheadings: ['32 min ago'],
                tags: ['London', 'shouting', 'photo', 'business'],
                icons: [{icon: 'yo-heart', value: 45, handler: () => {}},
                                {icon: 'yo-comment', value: 5645, handler: () => {}},
                                {icon: 'yo-eye', value: 45}],
                actions: [{text: 'action1', icon: 'yo-fire'}],
                bottomAction: {name: 'Add a comment...', handler: () => true },
                groups: ['London HQ', 'My-Stores'],
                sharedIn: 'Shared in'
            };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window, entry;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
            entry = {
                heading: 'Jerome barber',
                description: 'New photo shooting. This is extremely cool ! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                topLeftBadge: 'PDF',
                bottomLeftIcon: 'yo-trophy',
                imgSrc: 'https://blog.shelvingdesignsystems.com/hs-fs/hub/218229/file-22618644-jpg/images/make_the_most_of_retail_displays.jpg?t=1523455671276',
                icon: 'https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg',
                subheadings: ['32 min ago'],
                tags: ['London', 'shouting', 'photo', 'business'],
                icons: [{icon: 'yo-heart', value: 45, handler: () => {}},
                                {icon: 'yo-comment', value: 5645, handler: () => {}},
                                {icon: 'yo-eye', value: 45}],
                actions: [{text: 'action1', icon: 'yo-fire'}],
                bottomAction: {name: 'Add a comment...', handler: () => true },
                groups: ['London HQ', 'My-Stores'],
                sharedIn: 'Shared in'
            };
        });

        it('Shoudl emit an event when the bottom action is clicked', async () => {
            let element = await window.load({
                components: [YooCardFeedComponent],
                html: '<yoo-card-feed></yoo-card-feed>'
            });
            element.entry = entry;
            await window.flush();
            let bottom = element.querySelector('#action');
            window.document.addEventListener('bottomActionClicked', emitEvent);
            await bottom.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });


        it('Shoudl emit an event when a group is clicked is clicked', async () => {
            let element = await window.load({
                components: [YooCardFeedComponent],
                html: '<yoo-card-feed></yoo-card-feed>'
            });
            element.entry = entry;
            await window.flush();
            let group = element.querySelector('.feed-group ');
            window.document.addEventListener('groupClicked', emitEvent);
            await group.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(entry.groups[0]);
        });

        it('Should call the handler on icon click', async () => {
            let element = await window.load({
                components: [YooCardFeedComponent],
                html: '<yoo-card-feed></yoo-card-feed>'
            });
            let handler = jest.fn();
            entry.icons = [{icon: 'yo-heart', value: 45, handler: handler}];
            element.entry = entry;
            await window.flush();
            let icon = element.querySelector('.feed-icon');
            await icon.click();
            expect(handler).toHaveBeenCalled();
        });
    });
});