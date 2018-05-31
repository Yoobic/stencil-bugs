import { IEntity } from '../entity/entity.interface';

export class ITodo extends IEntity {
  fieldValue?: any;
  fieldExtra?: any;
  ownerDisplayName?: string;
  // field?: IFormField;

  title: string;
  user: any;
  duedate: Date;
  notificationemail?: Array<string>;
  reminderdate?: Date;
  priority?: string;
  values: Array<ITodoTask>;

}

export class ITodoTask extends IEntity {
  finished?: { value: boolean; date?: Date };
  imageData?: any;
  userComments?: string;
  fieldExtra?: any;
  fieldValue?: any;
  // field?: IFormField;

  text: { value: string };
  comments?: { value: string };
  duedate?: { value: Date };
  hasphoto?: { value: boolean };
  isphotorequired?: { value: boolean };
  allowLibrary?: { value: boolean };
}

export class ITodoTaskSimple extends IEntity {
  fieldExtra?: any;
  fieldValue?: any;
  originalFieldName?: string;
  // field?: IFormField;

  text: { value: string };
  user: any;
  duedate?: { value: Date };
  hasphoto?: { value: boolean };
  isphotorequired?: { value: boolean };
  allowLibrary?: { value: boolean };
}