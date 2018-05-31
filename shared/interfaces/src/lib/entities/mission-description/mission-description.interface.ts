
import { IEntity } from '../entity/entity.interface';
import { IPlan } from '../plan/plan.interface';
import { ICondition } from '../condition/condition.interface';
import { IScoring } from '../scoring/scoring.interface';
import { ISlide } from '../slide/slide.interface';

export class IMissionDescription extends IEntity {
    _id?: string;
    type: string;
    title: string;
    text: string;
    icon: any;
    background: any;
    group: Array<string>;
    serviceGroups: Array<string>;
    tags: Array<string>;
    missionTags: Array<string>;
    slides: Array<ISlide>; //Slide
    skipValidation: boolean;
    allowSameUserValidation: boolean;
    allowMultiple: boolean;
    // quizz: boolean;
    quizzMode: string;
    showAnswers: boolean;
    audit: boolean;
    recurring: boolean;
    language: string;
    submittext: string;
    successtext: string;
    versionmin: string;
    finishedGroups: Array<string>;
    notificationemail: Array<string>;
    archived: boolean;
    count: number;
    latest: Date;
    pdfMode?: string;
    creationDate: any;
    // conditions: Array<any>; //Condition
    // scoring: Array<any>; //Scoring

    lessonType: string;
    section: string;
    order: number;
    slideBackground: any;
    lightText: any;
    timerEnabled: number;
    duration: number;
    points: number;
    badges: Array<string>;
    minValue: number;
    preventRetry: boolean;
    plans: Array<IPlan>;

    quizz?: boolean;

    conditions: Array<ICondition>;
    scoring: Array<IScoring>;
    lessonStatus?: string;
    lessonValidated?: boolean;
    lessonLocked?: boolean;
    lessonScore?: any;
    isNext?: boolean;
    successRate?: number;
    averageDuration?: number;
    plansRef: Array<string>;
}