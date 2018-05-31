import { TestWindow } from '@stencil/core/testing';
import { YooMissionDetailComponent } from './mission-detail';
// import { YooBadgeComponent } from '../../core/badge/badge';
// import { YooProgressBarComponent } from '../../core/progress-bar/progress-bar';

describe('MissionDetailComponent', () => {
    let data = {
    'title': 'Store Visit Report',
    'type': 'mission',
    'priority': 4,
    'duedate': '2017-06-28T13:25:10.384Z',
    'status': 'booked',
    'originalUnvalidatedReason': 'Lorem ipsum dolor sit amet, consectetur adipe',
    'progress': {
      'value': 20,
      'totalPhotos': 2
    },
    'icon': 'http://res.cloudinary.com/www-yoobic-com/image/upload/v1458059035/nv6zlofgiaajrrlnxppu.jpg',
    '_geoloc': [-0.23755030000006627, 51.5314998],
    'address': '2 Bayfront Avenue B1-39A/40 & B2-38/39 The Shoppes at Marina Bay Sands, 18972, Singapore',
    'location': {
      '_id': '5836c051a501dc00176549f5',
      'clientid': 'YOOBIC_PROJECT',
      'title': 'Chandelier Building',
      'address': 'Chandelier Bldg, 8 Scrubs Ln, White City, London NW10 6RB, Royaume-Uni',
      'contactname': 'Singapore - Marina Bay Sands',
      'contactphone': '604-938-3954',
      'tags': ['test', 'CELIO_V0'],
      'info': 'Lorem ipsum dolor sit amet, consectetur adipe'
    },
    'description': {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipe elit, sed do eiusmod tempor incididunt ut mare labore et dolore magna aliqua. Ut enim ad alor minim veniam, quis nostrud exercitation nerde ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'slides': [{}, {}, {}, {}, {}]
    }
  };

    it('should build', () => {
        expect(new YooMissionDetailComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooMissionDetailComponent/**, YooProgressBarComponent, YooBadgeComponent**/],
                html: '<yoo-mission-detail></yoo-mission-detail>'
            });
        });

        it('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
        it('Should render with mission', async () => {
            element.mission = data;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });
    describe('Events', () => {
        let emitEvent, window;
        beforeEach(async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });
    });
});