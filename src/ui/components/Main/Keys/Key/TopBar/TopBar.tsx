import cn from './TopBar.module.css';
import { NavLink } from 'react-router-dom';
import { BackIcon } from '../../../../../assets/components/BackIcon.tsx';
import { SideMenu } from '../SideMenu/SideMenu.tsx';

export const TopBar = ({ networkId, data }) => {
  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <NavLink className={cn.link} to={`/${networkId}/keys`}>
          <BackIcon style={cn.icon} />
        </NavLink>
        <h2 className={cn.title}>{data?.publicKey}</h2>
        <SideMenu keyId={data?.publicKey} />
      </div>
    </div>
  );
};
