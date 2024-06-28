import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/Auth";


export const router = Router()


router.post(`/auth/register`, registerUserController)

router.post(`/auth/login`, loginUserController)
