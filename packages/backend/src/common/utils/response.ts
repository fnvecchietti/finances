import { APIresponse } from "api-response"

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_OK_MESSAGE = 'success'




export const setResponse = (code:number, data: any, skip?:number,  take?:number, total?: number, status?: string, message?: string) => {

    const response: APIresponse = {
        status,
        data,
        message,
    };

    if( skip || take || total){
        response.pagination = {
            skip,
            take,
            total
        }
    }
    

    return response;

}

export const setErrorResponse = (code:number, status?: string,message?: string) => {
    
}