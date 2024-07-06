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

export interface HookApiResponse {
    data: APIresponse | null;
    error: Error | null | unknown;
}
