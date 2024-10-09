import cn from './Topbar.module.scss';
import { SideMenu } from './SideMenu/SideMenu.jsx';

export const Topbar = ({ transaction }) => {
  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{transaction.name}</h1>
      <div className={cn.sideMenu}>
        <SideMenu transaction={transaction}  />
      </div>
    </div>
  );
};
