import { IGridSearch } from '../grid/grid.interface';
import { IFormField } from '../../entities/form-field/form-field.interface';

export interface IFormSearch {
    field: IFormField;
    search: IGridSearch;
}