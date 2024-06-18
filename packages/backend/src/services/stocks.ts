import { StockFilterableParams } from "filters";
import { Stocks } from "../common/models/entities/stocks";
import { createStockDTO } from "stocks";
import { PostgresDataSource } from "../common/models/datasource";
import { array, date, number, object, string } from "yup";

const bulkSchema = array().of(
  object({
    name: string(),
    ticker: string(),
    quantity: number(),
    purchase_price: number(),
    ratio: number(),
    purchase_date: date(),
    currency: string(),
  })
);

const stockSchema = object({
  name: string(),
  ticker: string(),
  quantity: number(),
  purchase_price: number(),
  ratio: number(),
  purchase_date: date(),
  currency: string(),
});

export const searchStocks = async (filterableParams: StockFilterableParams) => {
  return await Stocks.findAndCount({
    where: {
      id: filterableParams.id,
      name: filterableParams.name,
      ticker: filterableParams.ticker,
      quantity: filterableParams.quantity,
      purchase_price: filterableParams.purchase_price,
      ratio: filterableParams.ratio,
      purchase_date: filterableParams.purchase_date,
      currency: filterableParams.currency,
    },
    take: filterableParams.take,
    skip: filterableParams.skip,
    order: {
      ticker: "asc",
    },
  });
};

export const saveStocks = async (stock: createStockDTO) => {
    stockSchema.validateSync(stock)
  return await Stocks.insert({ ...stock });
};

export const getStockBalance = async () => {
  const stocks = await Stocks.find();
  let balance = 0;
  stocks.forEach((stock) => {
    balance = balance + (stock.current_price - stock.purchase_price) * stock.quantity;
  });

  
  return balance.toFixed(2);
};

export const bulkSaveStocks = async (stocks: createStockDTO[]) => {
  const queryRunner = PostgresDataSource.createQueryRunner();
  try {
    bulkSchema.validateSync(stocks)

    queryRunner.startTransaction();

    const bulk = stocks.map((stock) => {
      return { ...new Stocks(), ...stock };
    });

    await queryRunner.manager.save(Stocks, bulk);

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
