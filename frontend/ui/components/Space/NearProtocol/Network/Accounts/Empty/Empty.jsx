import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportAccount } from '../../_general/ImportAccount/ImportAccount.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isModalOpen, openModal, closeModal] = useToggler();

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <span className={cn.icon}></span>
        <h2 className={cn.title}>
          Nothing here. Import your first account to use it within the app.
        </h2>
      </div>
      <Button onClick={openModal}>Import account</Button>
      {isModalOpen && <ImportAccount closeModal={closeModal} />}
    </div>
  );
};
