export interface APIresponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message?: string;
    status: string;//'success' | 'error';
    pagination?: {
        total?: number;
        skip?: number;
        take?: number;
    }
}
