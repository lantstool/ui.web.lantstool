import cn from './Account.module.css';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault';
import { useLoader } from '../../../../../store/hooks/useLoader.ts';
import { TopBar } from './TopBar/TopBar.tsx';

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
          <Link className={cn.link} to="details">
            Details
          </Link>
          <Link className={cn.link} to="keys">
            Keys
          </Link>
          <Link className={cn.link} to="contract">
            Contract
          </Link>
        </div>
        <div className={cn.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
