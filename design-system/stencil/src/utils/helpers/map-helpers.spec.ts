import * as mapHelpers from './map-helpers';

describe('Map Helpers', () => {
    it('should generate and sort filter groups', () => {
        let markers = [{title: 'A', status: 'AB'}, {title: 'B', status: 'AB'}, {title: 'C', status: 'C'}];
        let filterGroups = mapHelpers.generateFilterGroups(markers, 'status');
        expect(filterGroups).toEqual([{title: 'C', count: 1, value: 'C', visible: true}, {title: 'AB', count: 2, value: 'AB', visible: true}]);
    });
});