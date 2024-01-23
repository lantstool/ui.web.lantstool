import { Navigation } from './Navigation/Navigation.tsx';
import cn from './Sidebar.module.css';
import { Network } from './Network/Network.tsx';

export const Sidebar = () => {
  return (
    <div className={cn.container}>
      <h2 className={cn.title}>Near Devtools</h2>
      <Network />
      <Navigation />
    </div>
  );
};
