import { Router } from "express";
import {
  bulkStocks,
  createStocks,
  getStocks,
  getStocksBalance,
} from "../controllers/Stocks";
import multer from "multer";
import { authenticationMiddleware } from "../middleware/authentication";

export const router = Router();

const upload = multer({ dest: "uploads/stocks/" });

router.get(`/stocks/balance`, authenticationMiddleware, getStocksBalance);

router.get(`/stocks`, authenticationMiddleware, getStocks);

router.post(
  `/stocks/bulk`,
  upload.single("file"),
  authenticationMiddleware,
  bulkStocks
);

router.post(`/stocks`, authenticationMiddleware, createStocks);
