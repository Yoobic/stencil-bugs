import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class IQuestionAnswer extends IEntity {
  _id: string;
  group: string | Array<string>;
  date?: Date;
  userRef: string;
  user: IUser;
  votesCount?: number;
  votesRef?: Array<string>;
  questionRef?: string;
  verified?: boolean;
  likesCount?: number;
  isLikedByMe?: boolean;
  viewsCount?: number;
  isViewedByMe?: boolean;

  text: string;
  imageData?: string;
}