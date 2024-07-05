import { Request, Response } from 'express';
import {
  setResponsePayload,
} from '../common/utils/response';
import {
  createBulkMovementsService,
  createMovementService,
  searchMovementsService,
} from '../services/Movements';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { convertDate, convertToFloat } from '../common/utils/format';
import { CreateMovementDto, MovementItem } from '../types/movement';
import { getTokenFromReq, decodeToken } from '../common/utils/jwt-utilts';

export const searchMovementsController = async (
  req: Request,
  res: Response,
) => {
  try {
    console.time('searchMovementsController');

    const filterableParams = req.query;

    const token = decodeToken(getTokenFromReq(req));

    const result = await searchMovementsService(
      filterableParams,
      token.username,
    );

    const response = setResponsePayload({
      data: result[0],
      total: result[1],
      message: 'success',
    });
    console.timeEnd('searchMovementsController');

    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createMovementController = async (req: Request, res: Response) => {
  try {
    console.time('createMovementController');

    // req.body.date always UTC
    const movement: CreateMovementDto = req.body;

    const token = decodeToken(getTokenFromReq(req));

    const result = await createMovementService(movement, token.username);

    const response = setResponsePayload({ data: result, status: 'success' });
    console.timeEnd('createMovementController');
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

// export const deleteMovement = async (req: Request, res: Response) => {};

// export const editMovement = async (req: Request, res: Response) => {};

export const createBulkMovementsController = async (
  req: Request,
  res: Response,
) => {
  console.time('createBulkMovementsController');
  const preInsert: any[] = [];
  const filePath = req.file.path;
  const prevalidatedObject: MovementItem[] = [];

  console.log(filePath);

  createReadStream(filePath)
    .pipe(parse())
    .on('data', (data: any) => {
      preInsert.push(data);
    })
    .on('end', () => {
      const headers = preInsert[0];

      for (let index = 1; index < preInsert.length; index++) {
        const row: MovementItem = {};
        for (let x = 0; x < headers.length; x++) {
          row[headers[x]] = preInsert[index][x].trim();

          if (headers[x] === 'amount') {
            const clean = preInsert[index][x].trim();
            row[headers[x]] = convertToFloat(clean);
          }

          if (headers[x] === 'date') {
            // Parse date from DD/MM/YYYY string to Date Object
            row[headers[x]] = convertDate(
              preInsert[index][x].trim(),
              'DD/MM/YYYY',
            );
          }
        }
        prevalidatedObject.push(row);
      }

      createBulkMovementsService(prevalidatedObject);
      console.timeEnd('createBulkMovementsController');
    });
  res.send();
};
