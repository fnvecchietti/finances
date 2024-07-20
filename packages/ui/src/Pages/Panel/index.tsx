import { ChangeEvent, useState } from 'react';
import { endpointsV1 } from '../../environent/api-config';
import axios from 'axios';
import { useModal } from '../../hooks/useModal';
import { WalletForm } from '../../components/Wallet/WalletForm';

const Panel = () => {
  const [movementName, setMovementName] = useState('');


  const changeMovementName = (e: ChangeEvent<HTMLInputElement>) => {
    setMovementName(e.target.value);
  };

  const createMovementType = () => {
    
  };

 

  return (
    <div className="w-full h-full text-center">
      <h1>Hi Admin</h1>
      <div className='container max-w-full grid grid-cols-12 gap-4'>
      <label className="p-2 col-span-12 lg:col-span-3 " htmlFor="movement-type">
            Movement type:
          </label>
          <input
            onChange={changeMovementName}
            id="movement-type"
            type="text"
            className="p-2 col-span-12 lg:col-span-6  outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in"
            placeholder="salary"
          />
          <button
            className="col-span-12 lg:col-span-1  bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded"
            onClick={createMovementType}
          >
            Add
          </button>

          <label className="p-2 col-span-12 lg:col-span-3" htmlFor="movement-type">
            Bulk Stocks
          </label>
          <input
            onChange={changeMovementName}
            id="movement-type"
            type="file"
            className="p-2 col-span-12 lg:col-span-6 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in"
            placeholder="salary"
          />
          <button
            className="col-span-12 lg:col-span-1 bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded"
            onClick={createMovementType}
          >
            Upload
          </button>
          <label className="p-2 col-span-12 lg:col-span-3" htmlFor="movement-type">
            Bulk Assets
          </label>
          <input
            onChange={changeMovementName}
            id="movement-type"
            type="file"
            className="p-2 col-span-12 lg:col-span-6 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in"
            placeholder="salary"
          />
          <button
            className="col-span-12 lg:col-span-1 bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded"
            onClick={createMovementType}
          >
            Upload
          </button>
      </div>
      <WalletForm/>
    </div>
  );
};

export default Panel;
