import { APIresponse } from 'api-response';


export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_OK_MESSAGE = 'success';

interface PayloadDTO {
  data?: unknown;
  status?: string;
  message?: string;
  skip?: number;
  take?: number;
  total?:number;
}

export const setResponsePayload = (input: PayloadDTO) => {

  const payload: APIresponse = {
    status: input.status,
    data: input.data,
    message: input.message,
  };

  if (input.skip || input.take || input.total) {
    payload.pagination = {
      skip:input.skip,
      take:input.take,
      total: input.total,
    };
  }

  return payload;
};
