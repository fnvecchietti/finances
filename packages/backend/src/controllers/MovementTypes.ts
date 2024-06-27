import { Request, Response } from 'express';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_OK_MESSAGE,
  setResponse,
} from '../common/utils/response';
import { MovementType } from '../common/models/Entity/MovementType';

export const createMovementType = async (req: Request, res: Response) => {
  try {
    const type = req.body.movement_type;

    if(!type || type.length < 3){
      throw Error('min Char is 3')
    }

    const response = await MovementType.save({ type });

    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const searchMovementTypes = async (req: Request, res: Response) => {
  try {
    const data = await MovementType.find();
    const response = setResponse(
      HTTP_STATUS_OK,
      data,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );
    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const deleteMovementType = async (req:Request, res:Response) => {}

export const editMovementType = async (req:Request, res:Response) => {}