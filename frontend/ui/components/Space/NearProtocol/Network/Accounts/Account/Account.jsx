import { Link, Outlet, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { AccountLink } from './AccountLink/AccountLink.jsx';
import { useManageRouting } from './useManageRouting.js';
import { Button } from '@gc/Button/Button.jsx';
import cn from './Account.module.scss';

export const Account = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccount = useStoreEffect((store) => store.nearProtocol.accounts.getAccount);
  const [isLoading, account] = useLoader(getAccount, { spaceId, networkId, accountId });

  useManageRouting();
  if (isLoading || !account) return null;

  return (
    <>
      <Link className={cn.backBtn} to="..">
        <Button color="tertiary" size="small" iconLeftStyles={cn.icon}>
          Back
        </Button>
      </Link>
      <div className={cn.account}>
        <HeadCard accountData={account} />
        <div className={cn.toggle}>
          <AccountLink to="details" text="Details" />
          <AccountLink to="keys" text="Associated keys" />
        </div>
        <Outlet />
      </div>
    </>
  );
};
