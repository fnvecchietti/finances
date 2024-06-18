import cron from 'node-cron'
import { Stocks } from '../models/entities/stocks'
import { getCurrentPriceOfStockFromInvertirOnline } from '../../services/current-price-scrapping'
import { PostgresDataSource } from '../models/datasource'

export const updatePrices = cron.schedule('*/2 * * * *', () => {
    try {
        getStocks()
    } catch (error) {
        console.log('Error on updating prices', error)
    }
})





const getStocks = async () => {
    const stocks = await Stocks.find()
    const stockStorage = {} as any

    stocks.forEach(stock => {
        const ticker = stock.ticker;

        if(stockStorage[ticker]) return;
        getCurrentPriceOfStockFromInvertirOnline(stock.ticker,stock.currency).then(price => {
            console.log('stock: ', stock.ticker, 'current price', price)
            stock.current_price = price;
            PostgresDataSource.createQueryBuilder()
            .update(Stocks)
            .set({current_price: price})
            .where({ticker: stock.ticker})
            .execute();
        })
        .catch(err => {
            console.error('error updating price of: ', stock.ticker, err)
        })
        stockStorage[ticker] = 1
    })
}