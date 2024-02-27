import { Outlet } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { useEffect } from 'react';
import { Empty } from './Empty/Empty.tsx';
import cn from './Keys.module.css';

export const Keys = () => {
  const getKeys = useStoreEffect((store: any) => store.keys.getKeys);
  const ids: string[] = useStoreState((store: any) => store.keys.ids);

  useEffect(() => {
    getKeys();
  }, []);

  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
