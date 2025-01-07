import { useState } from 'react';

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    isModalOpen: isOpen,
    openModal: open,
    closeModal: close,
  };
};

export default useModalState;
