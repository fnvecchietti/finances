import { Request } from 'express';
import {  decode, sign, verify } from 'jsonwebtoken';

export const signJWT = (id: string, username: string) => {
    
    const token = sign({ id, username }, process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRATION_TIME});
  
    return token;
  };

export const verifyJWT =(token: string) => {
    return verify(token, process.env.TOKEN_SECRET_KEY, function(err,decoded){
        if(err) throw err;
        return decoded;
      });
};

export const getTokenFromReq = (req:Request) => {
  const token = req.headers.authorization?.split(' ')[1];

  return token;
};
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeToken = (token:string): any => {
  return decode(token);
};