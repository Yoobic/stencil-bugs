import { IEntity } from '../entity/entity.interface';

export class ISubscription extends IEntity {
  _id?: string;
  transaction?: any;

  type: string;
  user1Name: string;
  user1Function: string;
  user1Email: string;
  user1Tel: string;
  user2Name: string;
  user2Function: string;
  user2Email: string;
  user2Tel: string;
  user3Name: string;
  user3Function: string;
  user3Email: string;
  user3Tel: string;
  storeName: string;
  storeOwner: string;
  storeAddress: string;
  storeTelephone: string;
  storSiren: string;
  storeRRDI: string;
  storeTVA: string;
  signatureName: string;
  signaturePlace: string;
  signatureDate: string;
  cgv: any;
  conditions: boolean;
  signature: string;
  emailReceipt: string;
  cardToken: any;
}