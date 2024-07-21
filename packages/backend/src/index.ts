
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { PostgresDataSource } from './common/models/datasource';

import { router as movements } from './routes/movements';
import { router as movementTypes } from './routes/movements-types';
import { router as stocks } from './routes/stocks';
import { router as auth } from './routes/auth';
import cookieParser from 'cookie-parser';
import { updatePrices } from './common/utils/cronjob';
import { router as wallets } from './routes/wallets';
const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;

const App = Express();

App.use(cors());

App.use(bodyParser.json());
App.use(cookieParser());

App.use('/api/v1',movementTypes);
App.use('/api/v1',movements);
App.use('/api/v1',stocks);
App.use('/api/v1',auth);
App.use('/api/v1', wallets)




PostgresDataSource.initialize()
.then(()=> {
    App.listen(SERVER_PORT,undefined,()=> {
        console.info('server running with the following configs: ');
        console.info({
            server_port: SERVER_PORT,
            priceUpdatingFeature: process.env.PRICE_UPDATING_FEATURE
        });
        if(process.env.PRICE_UPDATING_FEATURE === 'true' ){
            updatePrices.start();
        }
    });
}).catch(err=> {
    console.log(err);
    console.log('disconnecting in 3s');
    process.exit('1');
});

