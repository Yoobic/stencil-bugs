import { IEntity } from '../entity/entity.interface';

export class ICondition extends IEntity {
  key?: string;
  title?: string;
  type: string;
  operator: string;
  tags?: Array<string>;
  group?: Array<string>;
  values?: Array<any>;
  value?: any;
  field?: any;
}

export class IConditionalField extends IEntity {
  type?: string;
  fieldTitle?: string;
  operator: string;
  values?: Array<any>;
  value?: any;
  newFieldType?: string;
  newfieldTitle?: string;
  newfieldDescription?: string;
  newFieldRequired?: boolean;
}