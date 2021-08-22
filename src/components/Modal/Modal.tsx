import { memo } from 'react';
import styles from './modal.module.css';

export const Modal = memo(({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: any }) => {

  if (!isOpen) { return null };

  const closeModal = (event: any) => {
    event.preventDefault();

    if (onClose) {
      onClose();
    }
  }

  return (
    <div>
      <div className={styles.modal}>
        {children}
      </div>
      <div className={styles.bg} onClick={closeModal} />
    </div>
  )
})