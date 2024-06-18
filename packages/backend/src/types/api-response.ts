export interface APIresponse {
    data: APIdataResponse;
    message?: string;
    status: string;//'success' | 'error';
}


export interface APIdataResponse {
    result: any;
    pagination?: {
        total?: number;
        skip?: number;
        take?: number;
    }
}