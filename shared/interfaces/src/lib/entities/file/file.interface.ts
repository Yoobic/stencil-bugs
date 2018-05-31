import { IEntity } from '../entity/entity.interface';

export class IFile extends IEntity {

  boxId: string;
  folder: string;

  containerRef?: string;
  container?: any;

  fftype?: string;

  _downloadURL: string;
  size: number;
  hideMobile: boolean;
  group: any;

  _filename: string;
  mimeType: string;
  tags?: Array<string>;

  icon?: string;
  imgSrc?: string;

}
