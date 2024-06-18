import { useState } from 'react';

export const useModal = () => {
  const [isOpen, toggle] = useState(false);


  const cancel = () => {
    toggle(!isOpen);
  }

  const confirm = (tsk: Function) => {
    toggle(!isOpen);
    tsk()
  }

  const open = () => {
    toggle(!isOpen);
  }



  const ConfirmationModal = ({taskToExecute}: {taskToExecute: Function}) => {
    return (
      <div
        className={`${
          isOpen
            ? 'w-full h-full absolute top-0  left-0 backdrop-blur-md z-10 flex flex-col justify-center items-center'
            : 'hidden'
        }`}
      >
        <div
          className={`${
            isOpen
              ? ' text-black h-2/6 w-2/6 z-50 flex justify-center text-center flex-col'
              : 'hidden'
          }`}
        >
          <h1>Are you sure you want to continue ?</h1>
          <div className='flex justify-center'>
          <button className='p-2 hover:font-semibold' onClick={()=>confirm(taskToExecute)}>Yes</button>
          <button className='p-2 hover:font-semibold' onClick={cancel}>No</button>
          </div>
        </div>
      </div>
    );
  };

  return {
    open,
    confirm,
    cancel,
    ConfirmationModal,
  };
};
