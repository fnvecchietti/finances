export interface APIresponse {
    data: unknown | number | undefined;
    message?: string;
    status: string;//'success' | 'error';
    pagination?: {
        total?: number;
        skip?: number;
        take?: number;
    }
}

export interface HookApiResponse {
    data: APIresponse | null | APIresponse['data'];
    error: null | unknown
}
