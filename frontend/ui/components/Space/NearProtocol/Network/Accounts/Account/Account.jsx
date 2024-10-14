import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar/TopBar.jsx';
import { AccountLink } from './AccountLink/AccountLink.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Account.module.scss';

export const Account = () => {
  useManageRouting()

  return (
    <div className={cn.account}>
      <TopBar />
      <div className={cn.main}>
        <div className={cn.sidebar}>
          <AccountLink to="details" text="Details" />
          <AccountLink to="keys" text="Keys" />
        </div>
        <div className={cn.content}>
          <div className={cn.wrapper}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
