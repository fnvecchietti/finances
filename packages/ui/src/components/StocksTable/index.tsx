import { ChangeEvent, useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Loading } from '../LoadingBar';
import { NumericFormat } from 'react-number-format';
import { endpointsV1 } from '../../environent/api-config';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
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
