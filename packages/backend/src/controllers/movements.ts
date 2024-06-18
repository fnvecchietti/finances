import { Request, Response } from 'express';
import { HTTP_STATUS_OK, HTTP_STATUS_OK_MESSAGE, setResponse } from '../common/utils/response';
import { bulkSaveMovements, saveMovement, searchMovements } from '../services/movements';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { convertDate, convertToFloat } from '../common/utils/format';
import {  CreateMovementDto, MovementItem } from '../types/movement';

export const getMovements = async (req: Request, res: Response) => {
  try {
    const filterableParams = req.query;

    const result = await searchMovements(filterableParams);

    const response = setResponse(
    HTTP_STATUS_OK,
      result[0],
      undefined,
      undefined,
      result[1],
      HTTP_STATUS_OK_MESSAGE
    );

    res.status(HTTP_STATUS_OK).send(response);
  } catch (error) {
    res.send(error)
  }
};

export const createMovement = async (req: Request, res: Response) => {
  try {
    
    
    // req.body.date always UTC
    const movement: CreateMovementDto = req.body;

    const result = await saveMovement(movement);

    const response = setResponse(
      HTTP_STATUS_OK,
      result.raw,
      undefined,
      undefined,
      undefined,
      HTTP_STATUS_OK_MESSAGE
    )

    res.status(HTTP_STATUS_OK).send(response)
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};

export const deleteMovement = async (req:Request, res:Response) => {}

export const editMovement = async (req:Request, res:Response) => {}

export const bulkMovements = async (req: Request, res: Response) => {
  const preInsert: any[] = []
  const filePath = req.file.path;
  const prevalidatedObject: MovementItem[] = []

  console.log(filePath);

  createReadStream(filePath)
  .pipe(parse())
  .on('data', ((data: any) => {
    preInsert.push(data)
  }))
  .on('end', ()=> {
    const headers = preInsert[0]

    for (let index = 1; index < preInsert.length; index++) {
      let row:MovementItem = {}
      for (let x = 0; x < headers.length; x++) {
        
        row[headers[x]] = preInsert[index][x].trim();

        if(headers[x] === 'amount'){
          const clean = preInsert[index][x].trim()
          row[headers[x]] = convertToFloat(clean)
        }

        if(headers[x] === 'date'){
          // Parse date from DD/MM/YYYY string to Date Object
          row[headers[x]] = convertDate(preInsert[index][x].trim(), 'DD/MM/YYYY')
        }
        
        
      }
      prevalidatedObject.push(row)
    }
    
    bulkSaveMovements(prevalidatedObject)
    
  }) 
  res.send()
}

