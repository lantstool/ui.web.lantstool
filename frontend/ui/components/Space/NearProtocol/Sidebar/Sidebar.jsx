import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.css';
// import { Network } from './Network/Network.jsx';

export const Sidebar = () => {
  return (
    <div className={cn.container}>
      {/*<Network />*/}
      <Navigation />
    </div>
  );
};
