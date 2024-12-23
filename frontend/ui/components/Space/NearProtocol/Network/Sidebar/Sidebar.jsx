import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.scss';
import { SidebarOutline } from '../../../../_general/icons/SidebarOutline.jsx';
import { useStoreEffect } from '@react-vault';

export const Sidebar = ({ isSidebarMinimized }) => {
  const updateIsSidebarMinimized = useStoreEffect(
    (store) => store.nearProtocol.updateIsSidebarMinimized,
  );

  const handleClick = () => updateIsSidebarMinimized(!isSidebarMinimized);

  return (
    <div className={cn.sidebar}>
      <Navigation isSidebarMinimized={isSidebarMinimized} />
      <button onClick={handleClick} className={cn.button}>
        <SidebarOutline style={cn.icon} />
      </button>
    </div>
  );
};
