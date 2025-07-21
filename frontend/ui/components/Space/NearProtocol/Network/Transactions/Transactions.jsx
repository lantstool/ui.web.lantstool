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

  const [isLoadingTx] = useLoader(getTransactionsList, { spaceId, networkId }, [
    spaceId,
    networkId,
  ]);

  const [isLoadingFolders] = useLoader(
    getFoldersList,
    { spaceId, networkId, type: 'transaction' },
    [spaceId, networkId],
  );

  useManageRouting();

  if (isLoadingTx || isLoadingFolders) return null;
  if (txList.length === 0 && foldersList.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <List txList={txList} foldersList={foldersList} />
      {foldersList.length !== 0 && <Empty />}
      <Outlet />
    </div>
  );
};
