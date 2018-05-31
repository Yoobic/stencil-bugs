import { IEntity } from '../entity/entity.interface';

export class ICourse extends IEntity {
  _id?: string;
  group?: Array<string>;
  planRef: string;
  ownerRef: string;
  assignmentDate: Date;
  creatorRef: string;
  // plan?: IPlanWithStats;
  finishedLessonsCount?: number;
}