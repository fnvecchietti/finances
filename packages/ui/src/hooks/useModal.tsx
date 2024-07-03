import { useState } from 'react';
import { BasicConfirmModal } from '../components/ConfirmationModal';

export const useModal = () => {
  const [isOpen, toggle] = useState(false);

  const cancel = () => {
    toggle(!isOpen);
  };

  const confirm = (tsk: Function) => {
    toggle(!isOpen);
    tsk();
  };

  const open = () => {
    toggle(!isOpen);
  };

  const ConfirmationModal = ({
    taskToExecute,
  }: {
    taskToExecute: Function;
  }) => {
    return <BasicConfirmModal visible={isOpen} cancel={cancel} confirm={() => confirm(taskToExecute)} />;
  };

  return {
    open,
    confirm,
    cancel,
    ConfirmationModal,
  };
};
