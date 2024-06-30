import {Request, Response, NextFunction} from 'express'
import { sign, verify } from "jsonwebtoken";



export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  try {
    const decoded = verify(token, process.env.TOKEN_SECRET_KEY);

    console.log(decoded);
    
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};