import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isModalOpen, openModal, closeModal] = useToggler();

  return (
    <div className={cn.empty}>
      <div className={cn.wrapper}>
        <span className={cn.icon} />
        <h2 className={cn.title}>
          Looks empty. Import your first key to begin, or add one directly through a transaction.
        </h2>
      </div>
      <Button onClick={openModal}>Import Key</Button>
      {isModalOpen && <ImportKeyModal closeModal={closeModal} />}
    </div>
  );
};
