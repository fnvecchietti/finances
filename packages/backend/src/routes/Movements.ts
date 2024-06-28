import { Router } from "express";
import { createBulkMovementsController, createMovementController, searchMovementsController } from '../controllers/Movements'
import multer from 'multer'


export const router = Router()

const upload = multer({dest: 'uploads/movements/'})

router.get(`/`)

router.post(`/movements/bulk`,upload.single('file'), createBulkMovementsController)

router.get(`/movements`, searchMovementsController)

router.post(`/movements`, createMovementController)