import { IEntity } from '../entity/entity.interface';

export class IOperation extends IEntity {
    operationId: string;
    operationName: string;
    methodName: string;
    modelName: string;
    _createdAt: Date;
    count: number;
}
