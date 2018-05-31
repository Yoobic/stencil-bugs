import { IEntity } from '../entity/entity.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';

export class IMissionArchive extends IEntity {
  campaigns: { selection: Array<IMissionDescription> };
  archiveMissions: boolean;
}
