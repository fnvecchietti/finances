import { Request, Response } from "express";
import {
  bulkSaveStocks,
  getStockBalance,
  saveStocks,
  searchStocks,
} from "../services/Stocks";
import { setResponse } from "../common/utils/response";
import { HTTP_STATUS_OK } from "../common/utils/response";
import { HTTP_STATUS_OK_MESSAGE } from "../common/utils/response";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { convertDate } from "../common/utils/format";
import { convertToFloat } from "../common/utils/format";
import { StockItem } from "stocks";
import { getTokenFromReq, decodeToken } from "../common/utils/jwt-utilts";

export const getStocks = async (req: Request, res: Response) => {
  try {
    console.time('getStocks')
    
    const filterableParams = req.query;
    
    const token = decodeToken(getTokenFromReq(req));
    
    const result = await searchStocks(filterableParams, token.username);

    const response = setResponse(
      HTTP_STATUS_OK,
      result[0],
      undefined,
      undefined,
      result[1],
      HTTP_STATUS_OK_MESSAGE
    );
console.timeEnd('getStocks')
    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const getStocksBalance = async (req: Request, res: Response) => {
  try {
    console.time('getStocksBalance')
    
    const result = await getStockBalance();

    const response = setResponse(
      HTTP_STATUS_OK,
      result,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );
console.timeEnd('getStocksBalance')
    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};
export const createStocks = async (req: Request, res: Response) => {
  try {
    const stock = req.body;

    const result = await saveStocks(stock);

    const response = setResponse(
      HTTP_STATUS_OK,
      result.raw,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    );

    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const editStocks = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getStocksByName = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const bulkStocks = async (req: Request, res: Response) => {
  const preInsert: any[] = [];
  const filePath = req.file.path;
  const prevalidatedObject: StockItem[] = [];

  createReadStream(filePath)
    .pipe(parse())
    .on("data", (data: any) => {
      preInsert.push(data);
    })
    .on("end", () => {
      const headers = preInsert[0].map((item: string) => item.toLowerCase());

      for (let index = 1; index < preInsert.length; index++) {
        let row: StockItem = {};
        for (let x = 0; x < headers.length; x++) {
          row[headers[x]] = preInsert[index][x].trim();

          if (
            headers[x] === "quantity" ||
            headers[x] === "current_price" ||
            headers[x] === "purchase_price"
          ) {
            const clean = preInsert[index][x].trim();
            row[headers[x]] = convertToFloat(clean);
          }

          if (headers[x] === "purchase_date") {
            row[headers[x]] = convertDate(
              preInsert[index][x].trim(),
              "DD/MM/YYYY"
            );
          }

          if (headers[x] === "ratio") {
            row[headers[x]] = parseInt(preInsert[index][x]);
          }
        }
        prevalidatedObject.push(row);
      }

      bulkSaveStocks(prevalidatedObject);
    });
  res.status(200).send("ok");
};
