import cn from './Account.module.css';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useStoreEffect } from "../../../../../react-vault";
import { useEffect, useState } from "react";

const useLoader = (fn: any, deps: any = []) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fn();
      setResult(res);
      setLoading(false);
    })()
  }, deps);

  return [isLoading, result];
}

export const Account = () => {
  const { accountId } = useParams();
  const onMountAccount = useStoreEffect((store: any) => store.accounts.onMountAccount);
  // const addTestAccounts = useStoreEffect((store: any) => store.accounts.addTestAccounts);
  const [isLoading] = useLoader(() => onMountAccount(accountId));

  if (isLoading) return null;
  // addTestAccounts();
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
