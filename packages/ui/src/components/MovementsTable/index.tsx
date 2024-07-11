import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Loading } from '../LoadingBar';
import './index.css';
import { useModal } from '../../hooks/useModal';
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { endpointsV1 } from '../../environent/api-config';
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
  const { ConfirmationModal, open } = useModal();

  useEffect(() => {
    setData(tableData);
  }, [tableData, total]);

   
  if (!data) return <Loading />;

  return (
    <>
        <CustomTable data={data}/>
        <ConfirmationModal />
    </>
  );
};
