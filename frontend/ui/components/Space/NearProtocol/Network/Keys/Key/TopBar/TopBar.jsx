import cn from './TopBar.module.scss';
import { NavLink } from 'react-router-dom';
import { BackIcon } from '../../../../../../_general/icons/BackIcon.jsx';
import { SideMenu } from './SideMenu/SideMenu.jsx';

export const TopBar = ({ publicKey }) => {
  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <NavLink className={cn.link} to=".." relative="path">
          <BackIcon style={cn.icon} />
        </NavLink>
        <h2 className={cn.title}>{publicKey}</h2>
        <SideMenu />
      </div>
    </div>
  );
};
