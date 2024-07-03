import { Router } from 'express';
import { createMovementTypeController, searchMovementTypesController } from '../controllers/MovementTypes';


export const router = Router();

router.get('/movements-type', searchMovementTypesController);

router.post('/movements-type', createMovementTypeController);