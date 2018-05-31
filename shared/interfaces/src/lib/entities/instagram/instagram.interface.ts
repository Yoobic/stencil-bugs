import { IEntity } from '../entity/entity.interface';

export class IInstagram extends IEntity {
  _id: string;
  image: string;
  user_fullname: string;
  user_profilepicture: string;
  feedRef?: string;
  instagram_url?: string;
  likes_count?: number;
  comments_count?: number;

  title: string;
  tags: string;
  caption_text: string;
}

export class IInstagramConfig extends IEntity {
  _id: string;

  title: string;
  tags: string;
  group: string | Array<string>;
}
