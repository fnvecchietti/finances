import { useState } from 'react';
import { EntryForm } from '../../components/EntryForm';
import { StockForm } from '../../components/StockForm';

const Entry = () => {
  const [type, setType] = useState('');

  const handleClick = (kind:string) => {
    setType(kind);
  }

  if(type === 'stocks') return <StockForm/>

  if(type === 'entry') return <EntryForm/>

  return (
    <div className='flex justify-center w-full h-full mt-52'>
      <button 
        onClick={()=> handleClick('entry')} 
        className='mr-2 p-2 h-10 border outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black '>
        Entry
      </button>
      <button
        onClick={()=> handleClick('stocks')} 
        className='mr-2 p-2 h-10 border outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black '>
        Stocks
      </button>
    </div>     
  );

};

export default Entry;
