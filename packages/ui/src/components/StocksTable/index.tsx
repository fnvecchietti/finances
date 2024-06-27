import { ChangeEvent, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Loading } from "../LoadingBar";
import { NumericFormat } from "react-number-format";

export interface createStockDTO {
  id?: string;
  name?:string;
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
  setSkip
}: {
  tableData: any;
  total: number;
  take: number;
  skip: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
}) =>  {
  const [data, setData] = useState([] as any[]);
  const [cols, setCols] = useState([] as string[]);
  const { ConfirmationModal, open } = useModal();

  useEffect(() => {
    const keys = ['ticker', 'name', 'quantity', 'purchase price', 'purchase date', 'current price'];
    setCols(keys);
    setData(tableData)
  }, [tableData, total]);

  const handleChangeOnPageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setTake(parseInt(e.target.value));
  };

  const removeMoment = () => {
    open();
  };

  const calculateBalance = (quantity:number, purchasePrice:number, currentPrice:number, _:number) => {
    const result =  (currentPrice - purchasePrice) *  quantity;
    return <NumericFormat prefix='$' displayType='text' value={result.toFixed(2)} allowLeadingZeros thousandSeparator="," />;
    
  }

  const taskToExecuteAfterConfirmation = () => {
    console.log('some accion')
  };

  const nextPage = () => {
    const next = take + skip;
    if (next <= total) setSkip(next);
  };

  const previousPage = () => {
    const previous = skip - take;
    if (previous >= 0) setSkip(previous);
  };

  if (!data || !cols) return <Loading />;

  return (
    <>
        <table className="w-full border-collapse indent-0 shadow-lg mt-5 cursor-pointer">
          <thead className='shadow-sm rounded-sm bg-blue-gray-50'>
            <tr>
              {cols.map((col) => {
                return (
                  <th key={col} scope="col" className="pt-5 pb-5 text-sm tracking-wide">
                    {col}
                  </th>
                );
              })}
                <th scope="col" className="pt-5 pb-5 text-sm tracking-wide">
                balance
              </th>
              <th scope="col" className="pt-5 pb-5 text-sm tracking-wide">
                actions
              </th>
            </tr>
          </thead>
            <tbody>
              {data.map(({id, name, ticker, quantity, purchase_price, purchase_date, current_price})=> {
                return (
                  <tr key={id} className="border">
                    <td className="p-5 text-sm tracking-wide text-center">{ticker}</td>
                    <td className="p-5 text-sm tracking-wide text-center hidden sm:table-cell">{name}</td>
                    <td className="p-5 text-sm tracking-wide text-center">{quantity}</td>
                    <td className="p-5 text-sm tracking-wide text-center"> <NumericFormat prefix='$' displayType='text' value={purchase_price.toFixed(2)} allowLeadingZeros thousandSeparator="," /></td>
                    <td className="p-5 text-sm tracking-wide text-center">{purchase_date}</td>
                    <td className="p-5 text-sm tracking-wide text-center"><NumericFormat prefix='$' displayType='text' value={current_price.toFixed(2)} allowLeadingZeros thousandSeparator="," /></td>
                    <td className="p-5 text-sm tracking-wide text-center">{calculateBalance(quantity, purchase_price, current_price, 1)}</td>
                    <td key='actions' className="p-5 text-sm tracking-wide">
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
    </>
  )
}

export default StockTable;