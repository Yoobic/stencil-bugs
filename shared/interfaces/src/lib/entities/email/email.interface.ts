import { IEntity } from '../entity/entity.interface';

export class IEmailReport extends IEntity {
  comment: string;
  emails: Array<string>;
}

export class IUnblockEmails extends IEntity {
  emails: Array<string>;
}
