import cn from './BalanceLabel.module.css';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../../react-vault/index.js';

const getBalance = async (getAccountBalance, accountId, setBalance) => {
  if (!accountId) return;
  const balance = await getAccountBalance({ accountId });
  setBalance(balance);
};

export const BalanceLabel = ({ accountId }) => {
  const [balance, setBalance] = useState(null);
  const getAccountBalance = useStoreEffect((store) => store.nearProtocol.transactions.getAccountBalance);

  useEffect(() => {
    getBalance(getAccountBalance, accountId, setBalance);
  }, [accountId]);

  if (!balance || !accountId) return;

  return (
    <div className={cn.container}>
      <p className={cn.balance}>{balance} NEAR</p>
    </div>
  );
};
