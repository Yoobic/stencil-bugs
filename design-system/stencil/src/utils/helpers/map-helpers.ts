import { map, countBy, sortBy } from 'lodash-es';
import { IMarker, IFilterGroup } from '@shared/interfaces';

function mapMarkerCountToFilterGroup(markerCounts?): IFilterGroup[] {
    return map(markerCounts, (i, k) => {
        return {
            title: k.toUpperCase(),
            value: k,
            count: i,
            visible: true
        };
    });
}

export function generateFilterGroups(markers: IMarker[], groupBy: string): IFilterGroup[] {
    let markerCounts = countBy(markers, groupBy);
    let filterGroups = mapMarkerCountToFilterGroup(markerCounts);
    return sortBy(filterGroups, 'count');
}

export function layersFromKeys(filterGroups: IFilterGroup[]) {
    let layers: string[] = filterGroups.map( (filterGroup) => {
        return filterGroup.value;
    });
    return layers;
}

// Account for the mismatch between the classes in operations and the current syle classes
export function getOldCSSClasses() {
    let legendColorsNew = { available: 'warning', booked: 'accent', validated: 'success', rejected: 'danger', tobevalidated: 'info', archived: 'dark'};
    return legendColorsNew;
}