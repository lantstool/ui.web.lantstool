import { Outlet, useParams } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { Empty } from './Empty/Empty.jsx';
import cn from './Keys.module.scss';

export const Keys = () => {
  const { spaceId, networkId } = useParams();
  const ids = useStoreState((store) => store.nearProtocol.keys.ids);
  const getKeyList = useStoreEffect((store) => store.nearProtocol.keys.getKeyList);

  const [isLoading] = useLoader(getKeyList, { spaceId, networkId });
  useManageRouting();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
