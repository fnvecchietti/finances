import {Request, Response, NextFunction} from 'express';
import { verifyJWT } from '../common/utils/jwt-utilts';



export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  try {
    
    verifyJWT(token);

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};