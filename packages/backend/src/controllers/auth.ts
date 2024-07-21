import { CreateUserDTO, LoginUserDTO } from 'auth';
import { Request, Response } from 'express';
import { loginUserService, registerUserService } from '../services/auth';
import {
  HTTP_STATUS_OK_MESSAGE,
  setResponsePayload,
} from '../common/utils/response';
import * as argon2 from 'argon2';

import { signJWT, verifyJWT } from '../common/utils/jwt-utilts';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    console.time('registerUserController');

    const user = req.body as CreateUserDTO;

    const result = await registerUserService(user);

    const payload = setResponsePayload({
      data: result,
      status: HTTP_STATUS_OK_MESSAGE,
      message: 'User successfully registered',
    });

    console.timeEnd('registerUserController');
    return res.status(200).send(payload);
  } catch (error) {
    console.info(error);
    // Todo: Handle Error On parameters in USE like email.
    res.status(400).send(error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    console.time('loginUserController');
    const userLoginData = req.body as LoginUserDTO;
    console.time('logindb');
    const userData = await loginUserService(userLoginData);
    console.timeEnd('logindb');
    console.time('ArgonVerification');
    const result = await argon2.verify(
      userData.password,
      userLoginData.password,
    );
    console.timeEnd('ArgonVerification');
    
    if (!result) throw new Error('wrong passord');

    const token = signJWT(userData.id, userData.username);

    const response = setResponsePayload({data: token, message: 'success'});
    console.timeEnd('loginUserController');

    return res.status(200).send(response);

  } catch (error) {
    console.error(error);
    // Todo: Handle Error On parameters in USE like email.
    return res.status(400).send();
  }
};

export const validateTokenController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    const result = verifyJWT(token as string);

    const response = setResponsePayload({data: result, status: 'success'});

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    // Todo: Handle Error On parameters in USE like email.
    return res.status(400).send(error);
  }
};
