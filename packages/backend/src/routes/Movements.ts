import { Router } from 'express';
import { createBulkMovementsController, createMovementController, deleteMovementController, searchMovementsController } from '../controllers/Movements';
import multer from 'multer';
import { authenticationMiddleware } from '../middleware/authentication';


export const router = Router();

const upload = multer({dest: 'uploads/movements/'});

router.get('/');

router.post('/movements/bulk',upload.single('file'),authenticationMiddleware, createBulkMovementsController);

router.get('/movements',authenticationMiddleware, searchMovementsController);

router.post('/movements',authenticationMiddleware, createMovementController);

router.delete('/movements/:id',authenticationMiddleware, deleteMovementController);
