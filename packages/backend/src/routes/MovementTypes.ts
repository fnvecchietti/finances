import { Router } from "express";
import { createMovementType, searchMovementTypes } from '../controllers/MovementTypes'


export const router = Router()

router.get(`/movements-type`, searchMovementTypes)

router.post(`/movements-type`, createMovementType)