
import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import "reflect-metadata"
import { PostgresDataSource } from './common/models/datasource'
import { movementsV1 } from './routes/Movements'
import { movementsTypeV1 } from './routes/MovementTypes'
import { stocksV1 } from './routes/Stocks'
import { updatePrices } from './common/utils/cronjob'

const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000

const App = Express()
App.use(cors())
App.use(bodyParser.json())
App.use(movementsTypeV1)
App.use(movementsV1)
App.use(stocksV1)




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

