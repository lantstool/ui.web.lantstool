import { Link, Outlet } from 'react-router-dom';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { AccountLink } from './AccountLink/AccountLink.jsx';
import { useManageRouting } from './useManageRouting.js';
import { ArrowLeftOutline } from '../../../../../_general/icons/ArrowLeftOutline.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './Account.module.scss';

export const Account = () => {
  useManageRouting();

  return (
    <div className={cn.container}>
      <Link className={cn.backBtn} to="..">
        <Button size="small" IconLeft={ArrowLeftOutline}>
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
    </div>
  );
};
