import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Topbar } from './Topbar/Topbar.tsx';
import { Main } from './Main/Main.tsx';
import { useStoreEffect } from '../../react-vault/index.ts';
import cn from './App.module.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const onInitApp = useStoreEffect((store: any) => store.onInitApp);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onInitApp(setLoading);
  }, []);

  if (loading) return null;

  return (
    <div className={cn.container}>
      <Sidebar />
      {/*<Topbar />*/}
      <Main />
    </div>
  );
};
