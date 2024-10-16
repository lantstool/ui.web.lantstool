import { Navigation } from './Navigation/Navigation.jsx';
import cn from './Sidebar.module.scss';
import { SidebarOutline } from '../../../../_general/icons/SidebarOutline.jsx';
import { useStoreState, useStoreAction } from '../../../../../../../react-vault/index.js';

export const Sidebar = () => {
  const setMinimize = useStoreAction((store) => store.nearProtocol.setMinimize);
  const isMinimized = useStoreState((state) => state.nearProtocol.isMinimize);
  const handleClick = () => setMinimize(!isMinimized);

  return (
    <div className={isMinimized ? cn.minimizedSideBar : cn.sidebar}>
      <Navigation />
      <button onClick={handleClick} className={cn.button}>
        <SidebarOutline style={cn.icon} />
      </button>
    </div>
  );
};
