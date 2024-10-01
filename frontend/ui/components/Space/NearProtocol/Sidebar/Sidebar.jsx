import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.scss';
// import { Network } from './Network/Network.jsx';

export const Sidebar = () => {
  return (
    <div className={cn.sidebar}>
      {/*<Network />*/}
      <Navigation />
    </div>
  );
};
