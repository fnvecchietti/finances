import { APIresponse } from "api-response"
import { Response } from "express";

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_OK_MESSAGE = 'success'




export const setResponse = (code:number, data: any,response:Response, skip?:number,  take?:number, total?: number, status?: string, message?: string) => {

    const payload: APIresponse = {
        status,
        data,
        message,
    };

    if( skip || take || total){
        payload.pagination = {
            skip,
            take,
            total
        }
    }
    

    return response.status(code).send(payload);

}

export const setErrorResponse = (code:number, status?: string,message?: string) => {
    
}