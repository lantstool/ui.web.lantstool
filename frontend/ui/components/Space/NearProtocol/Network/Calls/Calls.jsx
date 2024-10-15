import { List } from './List/List.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Calls.module.scss';
import { useLoader } from '../../../../../hooks/useLoader.js';

export const Calls = () => {
  const list = useStoreState((store) => store.nearProtocol.calls.list);
  // const getOnceCalls = useStoreEffect((store) => store.calls.getOnceCalls);
  // const [isLoading] = useLoader(getOnceCalls);
  //
  useManageRouting();
  // if (isLoading) return null;
  if (list.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List list={list} />
      <Outlet />
    </div>
  );
};
