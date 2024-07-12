import { useEffect, useState } from 'react';
import { Loading } from '../LoadingBar';
import { CustomTable } from '../CustomTable';

export interface createStockDTO {
  id?: string;
  name?: string;
  ticker?: string;
  quantity?: number;
  purchase_price?: number;
  ratio?: number;
  purchase_date?: Date;
  currency?: string;
}

const StockTable = ({
  tableData,
  total,
  take,
  skip,
  setTake,
  setSkip,
}: {
  tableData: any;
  total: number;
  take: number;
  skip: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [data, setData] = useState([] as any[]);
  useEffect(() => {
    setData(tableData);
  }, [tableData, total]);

  if (!data) return <Loading />;

  return (
    <>
      <CustomTable
        data={data}
        rowCount={total}
        customPagination={{ take, skip, setTake, setSkip }}
      />
    </>
  );
};

export default StockTable;
