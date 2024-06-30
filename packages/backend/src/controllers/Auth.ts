import { CreateUserDTO, LoginUserDTO } from "auth";
import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/Auth";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_OK_MESSAGE,
  setResponse,
} from "../common/utils/response";
import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";

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
    console.error(error);
    // Todo: Handle Error On parameters in USE like email.
    res.status(400).send(error);

  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const userLoginData = req.body as LoginUserDTO;

    const userData = await loginUserService(userLoginData);

    const result = await argon2.verify(
      userData.password,
      userLoginData.password
    );

    if (!result) throw new Error("wrong passord");

    const token = JwtController(userData.id, userData.username);

    const response = setResponse(
      HTTP_STATUS_OK,
      token,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );

    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    // Todo: Handle Error On parameters in USE like email.
    res.status(400).send(error);

  }
};

const JwtController = (id: string, username: string) => {
  const token = sign({ id, username }, process.env.TOKEN_SECRET_KEY, {expiresIn: '60s'});

  return token;
};

export const validateTokenController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    const result = verify(token as string, process.env.TOKEN_SECRET_KEY, function(err, decoded){
      if(err) throw err;
      console.log('decoded', decoded)

    })

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
    console.error(error);
    // Todo: Handle Error On parameters in USE like email.
    res.status(400).send(error);
  }
};
