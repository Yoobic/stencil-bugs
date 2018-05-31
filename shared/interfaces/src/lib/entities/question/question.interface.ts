import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class IQuestion extends IEntity {
  _id: string;
  group: Array<string>;
  date?: Date;
  userRef: string;
  user: IUser;
  answersCount?: number;
  likesCount?: number;
  isLikedByMe?: boolean;
  viewsCount?: number;
  isViewedByMe?: boolean;

  title: string;
  description: string;
  imageData?: string;
  tags?: Array<string>;
  language: string;

}