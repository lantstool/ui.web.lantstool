import { List } from './List/List.jsx';
import { Empty } from './Empty/Empty.jsx';
import { useStoreState, useStoreEffect } from '@react-vault';
import { Outlet, useParams } from 'react-router-dom';
import { useLoader } from '@hooks/useLoader.js';
import { useManageRouting } from './useManageRouting.js';
import cn from './Transactions.module.scss';

export const Transactions = () => {
  const txList = useStoreState((store) => store.nearProtocol.transactions.txList);
  const foldersList = useStoreState((store) => store.nearProtocol.folders.records);
  const getTransactionsList = useStoreEffect((store) => store.nearProtocol.transactions.getList);
  const getFoldersList = useStoreEffect((store) => store.nearProtocol.folders.getList);

  const { spaceId, networkId } = useParams();
  const [isLoading] = useLoader(getTransactionsList, { spaceId, networkId }, [spaceId, networkId]);

  useLoader(getFoldersList, { spaceId, networkId }, [spaceId, networkId]);

  useManageRouting();

  if (isLoading) return null;
  if (txList.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <List txList={txList} foldersList={foldersList} />
      <Outlet />
    </div>
  );
};
