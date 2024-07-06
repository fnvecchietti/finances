import { Request, Response } from 'express';
import {
  bulkSaveStocks,
  deleteStockService,
  getStockBalance,
  saveStocks,
  searchStocks,
} from '../services/stocks';
import { setResponsePayload } from '../common/utils/response';
import { HTTP_STATUS_OK_MESSAGE } from '../common/utils/response';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { convertDate } from '../common/utils/format';
import { convertToFloat } from '../common/utils/format';
import { StockItem } from 'stocks';
import { getTokenFromReq, decodeToken } from '../common/utils/jwt-utilts';

export const getStocks = async (req: Request, res: Response) => {
  try {
    console.time('getStocks');

    const filterableParams = req.query;

    const token = decodeToken(getTokenFromReq(req));

    const result = await searchStocks(filterableParams, token.username);

    const response = setResponsePayload({
      data: result[0],
      total: result[1],
      message: HTTP_STATUS_OK_MESSAGE,
    });

    console.timeEnd('getStocks');
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const getStocksBalance = async (req: Request, res: Response) => {
  try {
    console.time('getStocksBalance');

    const result = await getStockBalance();

    const response = setResponsePayload({
      data: result,
      message: HTTP_STATUS_OK_MESSAGE,
    });
    console.timeEnd('getStocksBalance');
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};
export const createStocks = async (req: Request, res: Response) => {
  try {
    const stock = req.body;

    const token = decodeToken(getTokenFromReq(req));

    const result = await saveStocks(stock, token.username);

    const response = setResponsePayload({
      data: result,
      message: HTTP_STATUS_OK_MESSAGE,
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const deleteStocks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = decodeToken(getTokenFromReq(req));
    const result = await deleteStockService(id, token.username);
    const response = setResponsePayload({ data: result, status: 'success' });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

// export const editStocks = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {}
// };

// export const getStocksByName = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {}
// };

export const bulkStocks = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preInsert: any[] = [];
  const filePath = req.file.path;
  const prevalidatedObject: StockItem[] = [];

  createReadStream(filePath)
    .pipe(parse())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .on('data', (data: any) => {
      preInsert.push(data);
    })
    .on('end', () => {
      const headers = preInsert[0].map((item: string) => item.toLowerCase());

      for (let index = 1; index < preInsert.length; index++) {
        const row: StockItem = {};
        for (let x = 0; x < headers.length; x++) {
          row[headers[x]] = preInsert[index][x].trim();

          if (
            headers[x] === 'quantity' ||
            headers[x] === 'current_price' ||
            headers[x] === 'purchase_price'
          ) {
            const clean = preInsert[index][x].trim();
            row[headers[x]] = convertToFloat(clean);
          }

          if (headers[x] === 'purchase_date') {
            row[headers[x]] = convertDate(
              preInsert[index][x].trim(),
              'DD/MM/YYYY',
            );
          }

          if (headers[x] === 'ratio') {
            row[headers[x]] = parseInt(preInsert[index][x]);
          }
        }
        prevalidatedObject.push(row);
      }

      bulkSaveStocks(prevalidatedObject);
    });
  res.status(200).send('ok');
};