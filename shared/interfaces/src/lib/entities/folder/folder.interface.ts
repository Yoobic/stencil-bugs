import { IEntity } from '../entity/entity.interface';

export class IFolder extends IEntity {
  parent: string;
  stats: Array<{ title: string; value: number; color: string }>;
  fftype?: string;

  _id: string;
  name: string;
  group: string;
}

export class IFileOrFolder extends IEntity {
  _id: string;
  size?: number;

  hideMobile?: boolean;
  group?: any;
  boxId?: string;
  folder?: string;
  parent?: string;
  stats?: Array<{ title: string; value: number; color: string }>;

  fftype?: string;
  containerRef?: string;
  container?: any;

  name?: string;
  _filename?: string;
  mimeType?: string;

  icon?: string;
  imgSrc?: string;

}
