import { CreateUserDTO } from "auth";
import { Request, Response } from "express";
import { registerUserService } from "../services/Auth";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_OK_MESSAGE,
  setResponse,
} from "../common/utils/response";

const SALT_ROUNDS = 10;

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body as CreateUserDTO;
    
    const result = await registerUserService(user);

    const response = setResponse(
      HTTP_STATUS_OK,
      result,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );

    res.status(HTTP_STATUS_OK).send(response);

  } catch (error) {
    console.error(error)
    // Todo: Handle Error On parameters in USE like email.
    res.send(error);

  }
};

export const Login = async (req: Request, res: Response) => {



}
