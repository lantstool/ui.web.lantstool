import { List } from './List/List.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet, useParams } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useManageRouting } from './useManageRouting.js';
import { useLoader } from '../../../../../hooks/useLoader.js';
import cn from './Calls.module.scss';

export const Calls = () => {
  const list = useStoreState((store) => store.nearProtocol.calls.list);
  const getList = useStoreEffect((store) => store.nearProtocol.calls.getList);
  const { spaceId, networkId } = useParams();
  const [isLoading] = useLoader(getList, { spaceId, networkId });

  useManageRouting();

  if (isLoading) return null;
  if (list.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List list={list} />
      <Outlet />
    </div>
  );
};
