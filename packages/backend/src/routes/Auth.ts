import { Router } from "express";
import { registerUserController } from "../controllers/Auth";


export const router = Router()


router.post(`/auth/register`, registerUserController)