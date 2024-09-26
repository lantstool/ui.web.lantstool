import cn from './Account.module.scss';
import { useParams, Outlet } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../../../react-vault/index.js';
import { useLoader } from '../../../../../../hooks/useLoader.js';
import { TopBar } from './TopBar/TopBar.jsx';
import { AccountLink } from './AccountLink/AccountLink.jsx';

export const Account = () => {
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
