import cn from './Account.module.css';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useStoreEffect } from "../../../../../react-vault";
import { useLoader } from "../../../../../store/hooks/useLoader.ts";

export const Account = () => {
  const { accountId } = useParams();
  const onMountAccount = useStoreEffect((store: any) => store.accounts.onMountAccount);
  const [isLoading] = useLoader(() => onMountAccount(accountId));

  if (isLoading) return null;
  return (
    <div className={cn.account}>
      <div className={cn.topbar}>
        <Link to="..">Back</Link>
        <span>{accountId}</span>
      </div>
      <div className={cn.main}>
        <div className={cn.sidebar}>
          <Link to="general">General</Link>
          <Link to="keys">Keys</Link>
          <Link to="contract">Contract</Link>
        </div>
        <div className={cn.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
