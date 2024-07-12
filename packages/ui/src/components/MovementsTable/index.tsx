import { useEffect, useState } from 'react';
import { Loading } from '../LoadingBar';
import './index.css';
import { CustomTable } from '../CustomTable';

export const MovementsTable = ({
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
        customPagination={{ take, setTake, skip, setSkip }}
      />
    </>
  );
};
