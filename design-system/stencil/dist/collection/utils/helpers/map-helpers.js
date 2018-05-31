import { map, countBy, sortBy } from 'lodash-es';
function mapMarkerCountToFilterGroup(markerCounts) {
    return map(markerCounts, (i, k) => {
        return {
            title: k.toUpperCase(),
            value: k,
            count: i,
            visible: true
        };
    });
}
export function generateFilterGroups(markers, groupBy) {
    let markerCounts = countBy(markers, groupBy);
    let filterGroups = mapMarkerCountToFilterGroup(markerCounts);
    return sortBy(filterGroups, 'count');
}
export function layersFromKeys(filterGroups) {
    let layers = filterGroups.map((filterGroup) => {
        return filterGroup.value;
    });
    return layers;
}
// Account for the mismatch between the classes in operations and the current syle classes
export function getOldCSSClasses() {
    let legendColorsNew = { available: 'warning', booked: 'accent', validated: 'success', rejected: 'danger', tobevalidated: 'info', archived: 'dark' };
    return legendColorsNew;
}
