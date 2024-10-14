import { useStoreEffect, useStoreState } from '../../../../../../../react-vault/index.js';
import { Outlet, useParams } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useLoader } from '../../../../../hooks/useLoader.js';
import { useHandleNavigation } from './useHandleNavigation.js';
import cn from './Accounts.module.scss';

export const Accounts = () => {
  const ids = useStoreState((store) => store.nearProtocol.accounts.ids);
  const getAll = useStoreEffect((store) => store.nearProtocol.accounts.getAll);
  const { spaceId, networkId } = useParams();

  const [isLoading] = useLoader(getAll, { spaceId, networkId });
  useHandleNavigation();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.accounts}>
      <Outlet />
    </div>
  );
};
