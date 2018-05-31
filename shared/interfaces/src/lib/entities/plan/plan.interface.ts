import { IEntity } from '../entity/entity.interface';

export class IPlan extends IEntity {
  group?: Array<string>;
  assignmentGroupRef: string;
  users?: any; // list of users assigned to the plan

  _id: string;
  missiondescriptionRef?: Array<string>;
  title: string;
  description?: string;
  background: any;
  color?: any;
  archived?: any; // if true, the plan won't be returned by default (unless archived plans are specifically included in query)
  enableJourney?: any;
  timeConstraintMode?: string; // if empty, the plan is not time constrained
  availableFor?: number; // allocated time to finish the plan (in days)
  availableAfter?: number; // time to wait before unlocking (!= archiving) the plan (in days)
  availableFrom?: string; // date on which the plan will be available to assigned users
  availableTo?: string; // date after the plan will be locked (!= archived)
}

export interface IPlanWithStats extends IPlan {
  _id: any;
  finishedCount?: number; // (calculated) Total number of children lessons finished by all assigned users
  lessonsFinished?: number;
  finished?: number;
  lessonsCount?: number; // (calculated) Total number of children lessons
  count?: number;
  progress?: number;
  duration?: number; // (calculated) Total duration of children lessons (in minutes)
  averageDuration?: number; // (calculated) average time taken by all assigned users to actually finish the children lessons (in minutes)
  validatedCount?: number; // (calculated) Total number of children lessons validated
  availablePoints?: number; // (calculated) Total number of points available (sum of children lessons' points)
  earnedPoints?: number; // (calculated) Total number of points earned by assigned user
}
