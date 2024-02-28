import cn from './TopBar.module.css';
import { Link } from 'react-router-dom';
import { BackIcon } from '../../../../../assets/components/BackIcon.tsx';
import { SideMenu } from './SideMenu/SideMenu.tsx';

export const TopBar = ({ accountId }: any) => {
  return (
    <div className={cn.topbar}>
      <Link className={cn.btnBack} to="..">
        <BackIcon style={cn.icon} />
      </Link>
      <span className={cn.title}>{accountId}</span>
      <div className={cn.sideMenu}>
        <SideMenu accountId={accountId} />
      </div>
    </div>
  );
};
