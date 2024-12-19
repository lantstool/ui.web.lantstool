import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { KeySquareBold } from '../../../../../_general/icons/KeySquareBold.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isModalOpen, openModal, closeModal] = useToggler();

  return (
    <div className={cn.empty}>
      <div className={cn.wrapper}>
        <KeySquareBold style={cn.icon} />
        <h2 className={cn.title}>
          Looks empty. Import your first key to begin, or add one directly through a transaction.
        </h2>
      </div>
      <Button onClick={openModal}>Import key</Button>
      {isModalOpen && <ImportKeyModal closeModal={closeModal} />}
    </div>
  );
};
