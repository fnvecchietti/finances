import { Router } from "express";
import { bulkMovements, createMovement, getMovements } from '../controllers/movements'
import multer from 'multer'


export const movementsV1 = Router()
const prefix = '/v1'

const upload = multer({dest: 'uploads/'})

movementsV1.get(`${prefix}/`)

movementsV1.post(`${prefix}/movements/bulk`,upload.single('file'), bulkMovements)

movementsV1.get(`${prefix}/movements`, getMovements)

movementsV1.post(`${prefix}/movements`, createMovement)