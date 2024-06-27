import { ChangeEvent, useState } from 'react';
import { endpointsV1 } from '../../environent/api-config';
import axios from 'axios';
import { useModal } from '../../hooks/useModal';

const Panel = () => {
  const [movementName, setMovementName] = useState('');
  const { ConfirmationModal, open } = useModal();

  const changeMovementName = (e: ChangeEvent<HTMLInputElement>) => {
    setMovementName(e.target.value);
  };

  const createMovementType = () => {
    open();
  };

  const taskToExecuteAfterConfirmation = () => {
    axios.post(endpointsV1.movement_type, {
      movement_type: movementName,
    });
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
            className="p-2 col-span-12 lg:col-span-1  outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in"
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
            className="p-2 col-span-12 lg:col-span-1 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in"
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
            className="p-2 col-span-12 lg:col-span-1 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in"
            onClick={createMovementType}
          >
            Upload
          </button>
      </div>
      <ConfirmationModal taskToExecute={taskToExecuteAfterConfirmation} />
    </div>
  );
};

export default Panel;
