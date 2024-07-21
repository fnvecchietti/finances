import { Request, Response } from 'express';
import { createWalletService, searchWalletService } from '../services/wallets';
import {
  HTTP_STATUS_OK_MESSAGE,
  setResponsePayload,
} from '../common/utils/response';
import { decodeToken, getTokenFromReq } from '../common/utils/jwt-utilts';

export const searchWalletController = async (req: Request, res: Response) => {
  try {

    const token = decodeToken(getTokenFromReq(req));

    const data = await searchWalletService(token.id);
    console.log(data)
    const response = setResponsePayload({
      data: data[0],
      total: data[1],
      message: 'success',
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error)
    return res.status(400).send();
  }
};

export const createWalletController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const data = await createWalletService(name);

    const response = setResponsePayload({
      data,
      message: HTTP_STATUS_OK_MESSAGE,
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(400).send();
  }
};

export const updateWalletController = async () => {};

export const deleteWalletController = async () => {};
