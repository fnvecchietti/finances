import { Router } from 'express';
import { authenticationMiddleware } from '../middleware/authentication';
import { createWalletController, deleteWalletController, searchWalletController, updateWalletController } from '../controllers/wallets';


export const router = Router();


router.get('/wallet', authenticationMiddleware, searchWalletController);

router.post('/wallet', authenticationMiddleware, createWalletController);

router.put('/wallet/:id',authenticationMiddleware, updateWalletController)

router.delete('/wallet/:id',authenticationMiddleware, deleteWalletController);