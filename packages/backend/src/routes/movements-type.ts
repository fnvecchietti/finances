import { Router } from "express";
import { createMovementType, searchMovementTypes } from '../controllers/movements-type'


export const movementsTypeV1 = Router()
const prefix = '/v1'


movementsTypeV1.get(`${prefix}/movements-type`, searchMovementTypes)

movementsTypeV1.post(`${prefix}/movements-type`, createMovementType)