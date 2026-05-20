import { ImportAccount } from '../../_general/ImportAccount/ImportAccount.jsx';
import { AccountsList } from './AccountsList/AccountsList.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { CreateAccount } from '../_general/CreateAccount/CreateAccount.jsx';
import { useNetworkId } from '@hooks/useNetworkId.js';
import { useSearchParams } from 'react-router-dom';
import cn from './List.module.scss';

export const List = () => {
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
    <div className={cn.accountList}>
      <div className={cn.topbar}>
        <div className={cn.wrapper}>
          <h1 className={cn.title}>Accounts</h1>
          <p className={cn.subtitle}>Here you'll find the accounts used throughout this space.</p>
        </div>
        <div className={cn.btnWrapper}>
          <Button size="medium" onClick={openModal} color="secondary">
            Import
          </Button>
          {isTestnet && (
            <Button size="medium" onClick={openCreateModal}>
              Create
            </Button>
          )}
        </div>
      </div>
      <AccountsList />
      {isCreateModalOpen && isTestnet && <CreateAccount closeModal={closeCreateModal} />}
      {isModalOpen && <ImportAccount closeModal={closeModal} />}
    </div>
  );
};
