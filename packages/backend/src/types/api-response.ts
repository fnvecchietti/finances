export interface APIresponse {
    data: unknown;
    message?: string;
    status: string;//'success' | 'error';
    pagination?: {
        total?: number;
        skip?: number;
        take?: number;
    }
}
