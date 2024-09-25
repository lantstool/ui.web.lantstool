import { List } from './List/List.jsx';
import { Empty } from './Empty/Empty.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet, useParams } from 'react-router-dom';
import { useLoader } from '../../../../../hooks/useLoader.js';
import cn from './Transactions.module.scss';

export const Transactions = () => {
  const txList = useStoreState((store) => store.nearProtocol.transactions.txList);
  const getList = useStoreEffect((store) => store.nearProtocol.transactions.getList);
  const { spaceId, networkId } = useParams();
  const [isLoading] = useLoader(getList, { spaceId, networkId });

  if (isLoading) return null;
  if (txList.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <List txList={txList} />
      <Outlet />
    </div>
  );
};
