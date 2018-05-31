import { TestWindow } from '@stencil/core/testing';
import { YooFeedDetailComponent } from './feed-detail';

describe('FeedDetailComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
        (global as any).translateService = {
            polyglot: () => { },
            get: () => { }
        };
    });

    it('should build', () => {
        expect(new YooFeedDetailComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFeedDetailComponent],
                html: '<yoo-feed-detail></yoo-feed-detail>'
            });
        });

        xit('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        xit('Should render with a feed', async () => {
            element.feed = {
                user: {
                    imageData: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg',
                    firstName: 'Seb',
                    lastName: 'Mike'
                },
                tags: ['London', 'SkyRocket'],
                group: 'Best Group',
                likesCount: 34,
                image: 'https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg',
                viewsCount: 67,
                isLikedByMe: true,
                isViewedByMe: false,
                date: new Date(),
                description: 'This is the details of the feed ! '
            };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {
        let emitEvent;
        beforeEach(async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });
    });
});