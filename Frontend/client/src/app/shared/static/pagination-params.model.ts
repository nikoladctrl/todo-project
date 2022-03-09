export interface PaginationParams
{
    page: number;
    size: number;
    total?: number;
    numberOfPages?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
}