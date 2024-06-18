export interface Pagination {
    take?: number;
    skip?: number;
    order?: 'desc' | 'asc',
    from?: Date,
    to?: Date
}