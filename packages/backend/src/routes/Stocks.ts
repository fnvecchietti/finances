import { Router } from "express"
import { bulkStocks, createStocks, getStocks, getStocksBalance } from "../controllers/Stocks"
import multer from 'multer'

export const router = Router()


const upload = multer({dest: 'uploads/stocks/'})


router.get(`/stocks/balance`, getStocksBalance)

router.get(`/stocks`, getStocks)

router.post(`/stocks/bulk`,upload.single('file'), bulkStocks)

router.post(`/stocks`, createStocks)

