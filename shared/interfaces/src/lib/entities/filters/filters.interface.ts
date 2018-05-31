export interface FilterOperator {
    _id: string;
    title?: string;
    interval?: boolean;
}

export interface FilterField {
    field?: string;
    type?: string;
    //isFieldSelector?: boolean;
    defaultFields?: Array<string>;
    handleUndefined?: boolean;
    operator?: FilterOperator;
    radius?: number;
    value?: any;
    min?: any;
    max?: any;
    subQuery?: SubQuery;
    collectionName?: string;
}
export interface Filter extends Array<FilterField> { }

export interface Filters extends Array<Filter> { }

export interface SubQuery {
    //the collection the sub query is querying
    collectionName?: string;
    //the where clause on the sub collection
    where?: any;
    //the field to use in the main query
    field: string;
    //the field to get from the query
    values?: string;
    //flag to use nin instead of inq
    exclude?: boolean;
}

export interface Query {
    skip?: number;
    limit?: number;
    order?: Array<string>;
    fields?: Array<string>;
    where?: Object;
    include?: Array<string>;
    subQuery?: SubQuery | Array<SubQuery>;
    options?: Array<any>;
    includeCount?: boolean;
}

export interface IDatesRange {
    mode: string;
    amount: number;
    timescale: string;
    startDate: Date;
    endDate: Date;
    notsliding: boolean;
}