import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.scss';
// import { Network } from './Network/Network.jsx';
import { SidebarOutline } from '../../../_general/icons/SidebarOutline.jsx';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={cn.sidebar}>
      {/*<Network />*/}
      <Navigation isOpen={isOpen} />
      <button onClick={handleClick} className={cn.button}>
        <SidebarOutline style={cn.icon} />
      </button>
    </div>
  );
};
