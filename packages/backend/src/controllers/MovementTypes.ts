import { Request, Response } from 'express';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_OK_MESSAGE,
  setResponse,
} from '../common/utils/response';
import { MovementType } from '../common/models/Entity/MovementType';

export const createMovementTypeController = async (req: Request, res: Response) => {
  try {
    console.time('createMovementTypeController');
    const type = req.body.movement_type;

    if(!type || type.length < 3){
      throw Error('min Char is 3');
    }

    const response = await MovementType.save({ type });
    console.timeEnd('createMovementTypeController');
    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const searchMovementTypesController = async (req: Request, res: Response) => {
  try {
    console.time('searchMovementTypesController');
    
    const data = await MovementType.find();
    const response = setResponse(
      HTTP_STATUS_OK,
      data,
      res,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );
    console.timeEnd('searchMovementTypesController');
    return response;
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

// export const deleteMovementType = async (req:Request, res:Response) => {}

// export const editMovementType = async (req:Request, res:Response) => {}