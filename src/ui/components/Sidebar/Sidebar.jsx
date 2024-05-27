import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.css';
import { Network } from './Network/Network.jsx';

export const Sidebar = () => {
  return (
    <div className={cn.container}>
      <h2 className={cn.title}>Lantstool</h2>
      <Network />
      <Navigation />
    </div>
  );
};
