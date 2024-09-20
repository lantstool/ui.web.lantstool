import { Outlet } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault/index.js';
import { Empty } from './Empty/Empty.jsx';
import cn from './Keys.module.css';
import { useLoader } from '../../../../../../store/hooks/useLoader.js';

export const Keys = () => {
  const ids = useStoreState((store) => store.keys.ids);
  const loadKeysOnce = useStoreEffect((store) => store.keys.loadKeysOnce);
  const [isLoading] = useLoader(loadKeysOnce);

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
