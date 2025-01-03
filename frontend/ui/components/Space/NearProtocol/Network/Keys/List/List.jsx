import { KeyList } from './KeyList/KeyList.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './List.module.scss';

export const List = () => {
  const [isModalOpen, openModal, closeModal] = useToggler();

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <div className={cn.topbar}>
          <div className={cn.wrapper}>
            <h1 className={cn.title}>Keys</h1>
            <p className={cn.subtitle}>Here you'll find the keys used throughout this space.</p>
          </div>
          <Button size="medium" onClick={openModal}>
            Import
          </Button>
        </div>
      </div>
      <KeyList />
      {isModalOpen && <ImportKeyModal closeModal={closeModal} />}
    </div>
  );
};
