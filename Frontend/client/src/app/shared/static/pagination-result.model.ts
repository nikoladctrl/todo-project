import { PaginationParams } from "./pagination-params.model";

export interface List<T> {
    items: T[];
}


export interface PaginationResult<T> extends List<T>
{
    pagination: PaginationParams;
}