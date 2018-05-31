import { Model, Editable, Searchable, User, Location } from '@shared/data-core';
import { FormFieldType, ITimesheet } from '@shared/interfaces';

export interface ITimer {
    startDate: Date;
    endDate: Date;
    value?: number;
}

@Model({
    className: 'Timesheet',
    collectionName: 'timesheets',
    fields: ['*', 'location._id', 'location.clientid', 'location.title', 'location.address', 'owner._id', 'owner.firstName', 'owner.lastName', 'owner.username'],
    include: ['owner', 'location']
})

export class Timesheet extends ITimesheet {
    _id: string;

    @Editable('Timesheet', { type: FormFieldType.timer, required: true, columnDefinition: { width: 100 } })
    timer: ITimer;

    @Editable('Timesheet', { type: FormFieldType.location, multiple: false, required: true, columnDefinition: { width: 100 } })
    location: Location;

    @Editable('Timesheet', { type: FormFieldType.text, columnDefinition: { width: 100 } })
    @Searchable('Timesheet') assignment: string;

    @Editable('Timesheet', { type: FormFieldType.text, columnDefinition: { width: 100 } })
    recap: string;

    @Editable('Timesheet', { type: FormFieldType.textarea, columnDefinition: { width: 100 } })
    notes: string;

    owner: User;
}
