import { Link, Outlet } from 'react-router-dom';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { AccountLink } from './AccountLink/AccountLink.jsx';
import { useManageRouting } from './useManageRouting.js';
import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './Account.module.scss';

export const Account = () => {
  useManageRouting();

  return (
    <>
      <Link className={cn.backBtn} to="..">
        <Button color="tertiary" size="small" iconLeftStyles={cn.icon}>
          Back
        </Button>
      </Link>
      <div className={cn.account}>
        <HeadCard />
        <div className={cn.toggle}>
          <AccountLink to="details" text="Details" />
          <AccountLink to="keys" text="Associated keys" />
        </div>
        <Outlet />
      </div>
    </>
  );
};
