import { ChangeEvent, useState } from 'react';
import { endpointsV1 } from '../../environent/api-config';
import axios from 'axios';
import { useModal } from '../../hooks/useModal';

const Panel =() => {
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
    <div className="mt-20 w-full text-center">
      <h1>Hi Admin</h1>
      <div className="w-full mt-10 flex justify-center align-middle">
        <label className="p-2 h-10" htmlFor="movement-type">
          Movement type:
        </label>
        <input
          onChange={changeMovementName}
          id="movement-type"
          type="text"
          className="ml-2 flex h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
          placeholder="salary"
        />
        <button
          className="ml-2 p-2 h-10 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black"
          onClick={createMovementType}
        >
          Add movement type
        </button>
      </div>
      <ConfirmationModal taskToExecute={taskToExecuteAfterConfirmation} />
    </div>
  );
}

export default Panel;
