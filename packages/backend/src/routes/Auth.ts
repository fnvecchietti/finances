import { Router } from 'express';
import { registerUserController, loginUserController, validateTokenController } from '../controllers/Auth';


export const router = Router();


router.post('/auth/register', registerUserController);

router.post('/auth/login', loginUserController);

router.post('/auth/token', loginUserController);

router.get('/auth/token/validate', validateTokenController);


