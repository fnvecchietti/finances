import { Router } from "express";


export const authV1 = Router()

const prefix = '/v1'


authV1.post(`${prefix}/auth/register`)