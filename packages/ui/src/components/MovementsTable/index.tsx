import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FinancesContext } from '../../context';
import { Loading } from '../LoadingBar';
import './index.css';
import { useModal } from '../../hooks/useModal';
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { endpointsV1 } from '../../environent/api-config';

interface MovementItem {
  id: string;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  createDate: Date;
  updatedDate: Date;
}

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
  const [cols, setCols] = useState([] as string[]);
  const axiosPrivate = useAxiosPrivate();
  const { ConfirmationModal, open } = useModal();

  useEffect(() => {
    const keys = ['amount', 'currency', 'date', 'description'];
    setCols(keys);
    setData(tableData);
  }, [tableData, total]);

  const taskToExecuteAfterConfirmation = (id: string) => {
    return () => {
      axiosPrivate
        .delete(`${endpointsV1.movements}/${id}`)
        .then(() => {
          alert('k');
        })
        .catch(() => {
          alert('err');
        });
    };
  };

  const removeMoment = (id: string) => {
    open(() => taskToExecuteAfterConfirmation(id));
  };

  const handleChangeOnPageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setTake(parseInt(e.target.value));
  };

  const trendingUp = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    );
  };

  const trendingDown = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
        />
      </svg>
    );
  };
  const balance = (amount: number) => {
    const trending = amount > 0? trendingUp() : trendingDown()

    return (
      <span className='flex items-center justify-center'>
        {trending}
        {'\u00A0'}
        <NumericFormat
          prefix="$"
          displayType="text"
          value={amount}
          allowLeadingZeros
          thousandSeparator=","
        />
      </span>
    );
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
    <>
      <table className="w-full border-collapse indent-0 shadow-lg mt-5 cursor-pointer">
        <thead className="shadow-sm rounded-sm bg-white">
          <tr>
            {cols.map((col) => {
              return (
                <th
                  key={col}
                  scope="col"
                  className="pt-5 pb-5 text-sm tracking-wide"
                >
                  {col}
                </th>
              );
            })}
            <th
              scope="col"
              className="pt-5 pb-5 font-semibold tracking-wide text-sm "
            >
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, amount, currency, date, description }) => {
            return (
              <tr key={id} className="border">
                <td className="p-5 text-sm tracking-wide text-center">
                 {balance(amount)}
                </td>
                <td className="p-5 text-sm tracking-wide text-center">
                  {currency}
                </td>
                <td className="p-5 text-sm tracking-wide text-center">
                  {date}
                </td>
                <td className="p-5 text-sm tracking-wide text-center">
                  {description}
                </td>
                <td
                  key="actions"
                  className="p-5 text-sm tracking-wide text-center"
                >
                  <button className="table-button" onClick={() => removeMoment}>
                    Edit
                  </button>
                  <button
                    className="ml-5 table-button"
                    onClick={() => removeMoment(id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
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
      <ConfirmationModal />
    </>
  );
};