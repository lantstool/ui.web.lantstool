import cn from './BalanceLabel.module.css';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../react-vault';

const getBalance: any = async (getAccountBalance: any, accountId: any, setBalance: any) => {
  if (!accountId) return;
  const balance = await getAccountBalance({ accountId });
  setBalance(balance);
};

export const BalanceLabel = ({ accountId }: any) => {
  const [balance, setBalance] = useState(null);
  const getAccountBalance = useStoreEffect((store: any) => store.transactions.getAccountBalance);

  useEffect(() => {
    getBalance(getAccountBalance, accountId, setBalance);
  }, [accountId]);

  if (!balance) return;

  return (
    <div className={cn.container}>
      <p className={cn.balance}>{balance} NEAR</p>
    </div>
  );
};
