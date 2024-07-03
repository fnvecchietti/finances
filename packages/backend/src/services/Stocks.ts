import { StockFilterableParams } from 'filters';
import { Stock } from '../common/models/Entity/Stock';
import { createStockDTO } from 'stocks';
import { PostgresDataSource } from '../common/models/datasource';
import { stockSchema } from '../common/validations/StocksValidation';
import { bulkSchema } from '../common/validations/StocksValidation';




export const searchStocks = async (filterableParams: StockFilterableParams, username? :string) => {
  return await Stock.findAndCount({
    where: {
      id: filterableParams.id,
      name: filterableParams.name,
      ticker: filterableParams.ticker,
      quantity: filterableParams.quantity,
      purchase_price: filterableParams.purchase_price,
      ratio: filterableParams.ratio,
      purchase_date: filterableParams.purchase_date,
      currency: filterableParams.currency,
      createdBy: {username: username}
    },
    take: filterableParams.take,
    skip: filterableParams.skip,
    order: {
      ticker: 'asc',
    },
  });
};

export const saveStocks = async (stock: createStockDTO) => {
    stockSchema.validateSync(stock);
  return await Stock.insert({ ...stock });
};

export const getStockBalance = async () => {
  const stocks = await Stock.find();
  let balance = 0;
  stocks.forEach((stock) => {
    balance = balance + (stock.current_price - stock.purchase_price) * stock.quantity;
  });

  
  return balance.toFixed(2);
};

export const bulkSaveStocks = async (stocks: createStockDTO[]) => {
  const queryRunner = PostgresDataSource.createQueryRunner();
  try {
    bulkSchema.validateSync(stocks);

    queryRunner.startTransaction();

    const bulk = stocks.map((stock) => {
      return { ...new Stock(), ...stock };
    });

    await queryRunner.manager.save(Stock, bulk);

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
