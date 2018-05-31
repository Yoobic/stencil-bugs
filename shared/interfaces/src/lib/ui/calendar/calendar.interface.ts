export interface ICalendarMarker {
    _id: string;
    count: number;
}

export interface IDateChange {
    date: Date;
    startDate: Date;
    endDate: Date;
    mode: string;

}