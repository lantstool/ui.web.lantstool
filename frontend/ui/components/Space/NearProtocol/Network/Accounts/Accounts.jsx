import { useStoreEffect, useStoreState } from '@react-vault';
import { Outlet, useParams } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { useManageRouting } from './useManageRouting.js';
import cn from './Accounts.module.scss';

export const Accounts = () => {
  const ids = useStoreState((store) => store.nearProtocol.accounts.ids);
  const getAll = useStoreEffect((store) => store.nearProtocol.accounts.getAll);
  const { spaceId, networkId } = useParams();

  const [isLoading] = useLoader(getAll, { spaceId, networkId });
  useManageRouting();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.accounts}>
      <Outlet />
    </div>
  );
};
