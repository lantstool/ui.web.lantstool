import { Sidebar } from './List/Sidebar.jsx';
import { Empty } from './Empty/Empty.jsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.js';
import { useLoader } from '../../../../store/hooks/useLoader.js';

export const Transactions = () => {
  const list = useStoreState((store) => store.transactions.list);
  const getOnceTransactions = useStoreEffect(
    (store) => store.transactions.getOnceTransactions,
  );
  const [isLoading] = useLoader(getOnceTransactions);
  useNavigateToSavedRoute('/:currentNetworkId/transactions');

  if (isLoading) return null;
  if (list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
