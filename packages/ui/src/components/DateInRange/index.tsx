import { ChangeEvent, useState } from 'react';

interface PairValueKeyString {
  [k: string] : string
}
export const DateInRange = ({
  initialStateFrom,
  initialStateToDate,
  callbackRange
}: {
  initialStateFrom: string;
  initialStateToDate: string;
  callbackRange: Function
}) => {
  const [range, setRange] = useState<PairValueKeyString>({ from: initialStateFrom, toDate: initialStateToDate });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(range[name] != value){
      setRange({ ...range, [name]: value });
    }
  };

  const handleSearchClick = () => {
    callbackRange(range)
  }

  return (
    <div className='justify-center flex'>
      <label className='h-10 p-2' htmlFor="from">From</label>
      <input
        onInput={handleOnChange}
        type="date"
        name="from"
        id="from"
        value={range.from}
        className='h-10 p-2 ml-2 mr-2 outline-none border rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black '
      />
      <label className='h-10 p-2' htmlFor="toDate">To</label>
      <input
        onInput={handleOnChange}
        type="date"
        name="toDate"
        id="toDate"
        value={range.toDate}
        className='h-10 p-2 ml-2 mr-2 outline-none border rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black '
      />
      <button 
      onClick={handleSearchClick}
      className='mr-2 p-2 h-10 border outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black '
      >Search</button>
    </div>
  );
};
