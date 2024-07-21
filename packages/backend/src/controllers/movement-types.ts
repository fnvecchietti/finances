import { Request, Response } from 'express';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_OK_MESSAGE,
  setResponsePayload,
} from '../common/utils/response';
import { MovementType } from '../common/models/Entity/movements-types';
import {string} from 'yup';

const movementTypeSchema = string().required().min(3).max(30);
export const createMovementTypeController = async (req: Request, res: Response) => {
  try {
    const type = req.body.movement_type;
    
    movementTypeSchema.validate(type);
    
    const response = await MovementType.save({ type });
    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    return res.status(400).send();
  }
};

export const searchMovementTypesController = async (req: Request, res: Response) => {
  try {
    
    const data = await MovementType.find();
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

// export const deleteMovementType = async (req:Request, res:Response) => {}

// export const editMovementType = async (req:Request, res:Response) => {}