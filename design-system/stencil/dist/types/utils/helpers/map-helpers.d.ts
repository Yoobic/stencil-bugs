import { IMarker, IFilterGroup } from '@shared/interfaces';
export declare function generateFilterGroups(markers: IMarker[], groupBy: string): IFilterGroup[];
export declare function layersFromKeys(filterGroups: IFilterGroup[]): string[];
export declare function getOldCSSClasses(): {
    available: string;
    booked: string;
    validated: string;
    rejected: string;
    tobevalidated: string;
    archived: string;
};
