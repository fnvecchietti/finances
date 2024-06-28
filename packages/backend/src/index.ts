
import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import "reflect-metadata"
import { PostgresDataSource } from './common/models/datasource'

import { router as movements } from './routes/Movements'
import { router as movementTypes } from './routes/MovementTypes'
import { router as stocks } from './routes/Stocks'
import { router as auth } from './routes/Auth'

import { updatePrices } from './common/utils/cronjob'

const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000

const App = Express()

App.use(cors())

App.use(bodyParser.json())

App.use("/api/v1",movementTypes)
App.use("/api/v1",movements)
App.use("/api/v1",stocks)
App.use("/api/v1",auth)





PostgresDataSource.initialize()
.then(()=> {
    App.listen(SERVER_PORT,undefined,()=> {
        console.info(`server running with the following configs: `)
        console.info({
            server_port: SERVER_PORT,
            priceUpdatingFeature: process.env.PRICE_UPDATING_FEATURE || false
        })
    })
    if(process.env.PRICE_UPDATING_FEATURE){
        updatePrices.start()
    }else{
        updatePrices.stop()
        console.info('Price update feature off')
    }
}).catch(console.log)

