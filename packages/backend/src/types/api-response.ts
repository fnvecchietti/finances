export interface APIresponse {
    data: any;
    message?: string;
    status: string;//'success' | 'error';
    pagination?: {
        total?: number;
        skip?: number;
        take?: number;
    }
}
