import { Button } from '@gc/Button/Button.jsx';
import { ImportAccount } from '../../_general/ImportAccount/ImportAccount.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { CreateAccount } from '../_general/CreateAccount/CreateAccount.jsx';
import { useNetworkId } from '@hooks/useNetworkId.js';
import { useSearchParams } from 'react-router-dom';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isModalOpen, openModal, closeModal] = useToggler();
  const { isTestnet } = useNetworkId();
  const [searchParams, setSearchParams] = useSearchParams();
  const isCreateModalOpen = searchParams.get('modal') === 'create';

  const openCreateModal = () => setSearchParams({ modal: 'create' });
  const closeCreateModal = () => {
    searchParams.delete('modal');
    setSearchParams(searchParams);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <span className={cn.icon}></span>
        <h2 className={cn.title}>
          Nothing here. Import your first account to use it within the app.
        </h2>
      </div>
      <div className={cn.btnWrapper}>
        {
          <Button onClick={openModal} color="secondary">
            Import Account
          </Button>
        }
        {isTestnet && <Button onClick={openCreateModal}>Create account</Button>}
      </div>
      {isCreateModalOpen && isTestnet && <CreateAccount closeModal={closeCreateModal} />}
      {isModalOpen && <ImportAccount closeModal={closeModal} />}
    </div>
  );
};
