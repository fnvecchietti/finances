import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FinancesContext } from '../../context';
import { Loading } from '../LoadingBar';
import './index.css';
import { useModal } from '../../hooks/useModal';
import { NumericFormat } from 'react-number-format';

interface MovementItem {
  id: string;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  createDate: Date;
  updatedDate: Date;
}

export const BasicTable = ({
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
  const [cols, setCols] = useState([] as string[]);
  const { filter } = useContext(FinancesContext);
  const { ConfirmationModal, open } = useModal();

  useEffect(() => {
    const keys = ['amount', 'currency', 'date', 'description'];
    setCols(keys);
    if (filter !== '') {
      const filteredData = data.filter((item: MovementItem) => {
        return Object.values(item).some((value: string) => {
          return value.toString().toLowerCase().includes(filter.toLowerCase());
        });
      });
      setData(filteredData);
    } else {
      setData(tableData);
    }
  }, [tableData, total, filter]);

  const handleChangeOnPageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setTake(parseInt(e.target.value));
  };

  const removeMoment = () => {
    open();
  };

  const taskToExecuteAfterConfirmation = () => {
    console.log('some accion')
  };

  const nextPage = () => {
    const next = take + skip;
    if (next <= total) setSkip(next);
  };

  const previousPage = () => {
    const previous = skip - take;
    console.log(previous);

    if (previous >= 0) setSkip(previous);
  };

  if (!data || !cols) return <Loading />;

  return (
    <div>
        <table className="border-collapse indent-0 shadow-lg mt-5 cursor-pointer">
          <thead>
            <tr>
              {cols.map((col) => {
                return (
                  <th key={col} scope="col" className="pt-5 pb-5 ">
                    {col}
                  </th>
                );
              })}
              <th scope="col" className="pt-5 pb-5">
                actions
              </th>
            </tr>
          </thead>
            <tbody>
              {data.map(({id, amount, currency, date, description})=> {
                return (
                  <tr key={id} className="border">
                    <td className="p-5 text-center"><NumericFormat prefix='$' displayType='text' value={amount} allowLeadingZeros thousandSeparator=","/></td>
                    <td className="p-5 text-center">{currency}</td>
                    <td className="p-5 text-center">{date}</td>
                    <td className="p-5 text-center">{description}</td>
                    <td key='actions' className="p-5">
                      <button className='table-button' onClick={removeMoment}>Edit</button>
                      <button className="ml-5 table-button" onClick={removeMoment}>Remove</button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
        </table>
      <div className="flex w-full items-center justify-center mt-5">
        <div className="flex justify-start mr-auto p-2  rounded">
          <span>Total: {total}</span>
        </div>
        <div className="flex justify-end ml-auto">
          <select
            className="p-2 rounded bg-white"
            name="take"
            id="take"
            onChange={handleChangeOnPageSize}
            defaultValue={take}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <button className="p-2 mr-2 ml-2 rounded " onClick={previousPage}>
            Back
          </button>
          <button className="p-2 rounded " onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
      <ConfirmationModal taskToExecute={taskToExecuteAfterConfirmation} />
    </div>
  );
};
