import { ILocation } from '../location/location.interface';

export interface IHealthscore {
    healthscore: number;
    reactivity: number;
    compliance: number;
    accuracy: number;
    review: number;
    todo: number;
    pending: number;
    approved: number;
    rejected: number;
    evolution: {
        lowest: number;
        current: number;
        highest: number;
        evolution: Array<{ date: Date; value: number }>;
        comparison: Array<{ location: ILocation; value: number }>
    };
}