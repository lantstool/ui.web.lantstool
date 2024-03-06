import { Outlet } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { Empty } from './Empty/Empty.tsx';
import cn from './Keys.module.css';
import {useLoader} from "../../../../store/hooks/useLoader.ts";

export const Keys = () => {
  const ids: string[] = useStoreState((store: any) => store.keys.ids);
  const loadKeysOnce = useStoreEffect((store: any) => store.keys.loadKeysOnce);
  const [isLoading] = useLoader(loadKeysOnce);

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
