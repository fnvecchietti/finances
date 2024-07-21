import { Request, Response } from 'express';
import { createPrompService } from '../services/ai-prompt';
import { setResponsePayload } from '../common/utils/response';
import { HTTP_STATUS_OK_MESSAGE } from '../common/utils/response';
import { Stock } from '../common/models/Entity/stocks';
import { Movement } from '../common/models/Entity/movements';


interface KeyValue {
  [k: string]: any
}
const queryingDatabaseInfo = (ask: string) => {

    const map: KeyValue = {
      "stock": Stock,
      "movement": Movement
    }
    const found = Object.keys(map).map(key=> {
      if(ask.includes(key)){
        return map[key];
      }
    })

    return found;
}

export const createPromptController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const entitiesToFetch = queryingDatabaseInfo(prompt)
    let bunchOfData = []
    if(entitiesToFetch.length > 0){
      for (const iterator of entitiesToFetch) {
        const result = await iterator.find()
        bunchOfData.push(result)
      }
    }

    console.log(bunchOfData)
    const data = {data: 'somePrompt'}

    const response = setResponsePayload({
      data,
      message: HTTP_STATUS_OK_MESSAGE,
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
};
