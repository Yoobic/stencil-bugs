export interface IGridSearch {
    search: string;
    currentPage: number;
    pageSize: number;
    appendData: boolean;
    infiniteScroll?: { complete: Function; disabled: boolean; };
}