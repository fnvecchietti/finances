import { useState } from 'react';
import { BasicConfirmModal } from '../components/ConfirmationModal';

export const useModal = () => {
  const [isOpen, toggle] = useState(false);
  const [fn, setFn] = useState<Function>();

  const cancel = () => {
    toggle(!isOpen);
  };

  const confirm = () => {
    toggle(!isOpen);
    if(fn) fn();
  };

  const open = (fnToExecute: Function) => {
    toggle(!isOpen);
    setFn(fnToExecute)
  };

  const ConfirmationModal = () => {
    return <BasicConfirmModal visible={isOpen} cancel={cancel} confirm={confirm} />;
  };

  return {
    open,
    confirm,
    cancel,
    ConfirmationModal,
  };
};
