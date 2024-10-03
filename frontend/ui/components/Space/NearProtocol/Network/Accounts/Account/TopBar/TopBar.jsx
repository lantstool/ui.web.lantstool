import cn from './TopBar.module.scss';
import { Link, useParams } from 'react-router-dom';
import { BackIcon } from '../../../../../../_general/IconsComponents/BackIcon.jsx';
import { SideMenu } from './SideMenu/SideMenu.jsx';

export const TopBar = () => {
  const { accountId } = useParams();
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
