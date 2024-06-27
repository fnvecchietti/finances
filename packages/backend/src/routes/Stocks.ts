import { Router } from "express"
import { bulkStocks, createStocks, getStocks, getStocksBalance } from "../controllers/Stocks"
import multer from 'multer'

export const stocksV1 = Router()
const prefix = '/v1'
const upload = multer({dest: 'uploads/stocks/'})


stocksV1.get(`${prefix}/stocks/balance`, getStocksBalance)

stocksV1.get(`${prefix}/stocks`, getStocks)

stocksV1.post(`${prefix}/stocks/bulk`,upload.single('file'), bulkStocks)

stocksV1.post(`${prefix}/stocks`, createStocks)

