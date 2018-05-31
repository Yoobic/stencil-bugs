import { IUser } from '../../entities/user/user.interface';

export interface IChatMessage {
    content: string;
    author?: IUser;
    time?: Date;
    isAlternate?: boolean;
    img?: string;
    deleted?: boolean;
}
