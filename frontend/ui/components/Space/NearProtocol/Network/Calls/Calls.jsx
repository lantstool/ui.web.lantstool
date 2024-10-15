import { List } from './List/List.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Calls.module.scss';
import { useLoader } from '../../../../../hooks/useLoader.js';

export const Calls = () => {
  const ids = useStoreState((store) => store.nearProtocol.calls.ids);
  // const getOnceCalls = useStoreEffect((store) => store.calls.getOnceCalls);
  // const [isLoading] = useLoader(getOnceCalls);
  //
  useManageRouting();
  // if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List ids={ids} />
      <Outlet />
    </div>
  );
};
