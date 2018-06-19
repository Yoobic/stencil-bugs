import { INavBarTab } from '../../ui/navbar/navbar.interface';

export interface IEntitySearchRequest {
    search?: string;
    tab: INavBarTab;
}