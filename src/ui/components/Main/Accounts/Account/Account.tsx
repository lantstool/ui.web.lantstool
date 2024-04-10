import cn from './Account.module.css';
import { useParams, Outlet } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault';
import { useLoader } from '../../../../../store/hooks/useLoader.ts';
import { TopBar } from './TopBar/TopBar.tsx';
import { AccountLink } from './AccountLink/AccountLink.tsx';

export const Account = () => {
  const { accountId } = useParams();

  const onMountAccount = useStoreEffect((store: any) => store.accounts.onMountAccount);
  const [isLoading] = useLoader(() => onMountAccount(accountId));

  if (isLoading) return null;

  return (
    <div className={cn.account}>
      <TopBar accountId={accountId} />
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
