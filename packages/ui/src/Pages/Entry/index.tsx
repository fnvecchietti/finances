import { useState } from 'react';
import { StockForm } from '../../components/Stock/StockForm';
import { MovementForm } from '../../components/Movement/MovementForm';


const Entry = () => {
  const [type, setType] = useState('');

  const handleClick = (kind:string) => {
    setType(kind);
  }

  if(type === 'stocks') return <StockForm/>

  if(type === 'entry') return <MovementForm/>

  return (
    <div className='flex justify-center w-full h-full mt-52'>
      <button 
        onClick={()=> handleClick('entry')} 
        className='bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded'>
        Movement
      </button>
      <button
        onClick={()=> handleClick('stocks')} 
        className='bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 ml-2 rounded'>
        Stocks
      </button>
    </div>     
  );

};

export default Entry;
