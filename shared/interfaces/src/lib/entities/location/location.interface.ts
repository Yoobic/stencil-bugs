import { IEntity } from '../entity/entity.interface';

export class ILocation extends IEntity {
    clientid?: string;
    title: string;
    address: string;
    vip?: boolean;
    tags?: Array<string>;
    type: any; //?LocationType
    typeRef: string;
    missiondescriptions?: Array<any>;
    missiondescriptionsRef?: Array<string>;
    notificationemail?: Array<string>;
    contactname?: string;
    contactemail?: string;
    contactphone?: string;
    info?: string;
    _geoloc: [number, number];
    properties?: any; //IProperties
    distance?: number;
    stats?: Array<{ title: string; value: number; color: string }>;

}
