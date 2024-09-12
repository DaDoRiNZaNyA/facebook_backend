export declare class PaginationResponseDto<T> {
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    data: T[];
}
