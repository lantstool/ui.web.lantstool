import cn from './BalanceLabel.module.css';
import nearIcon from '../../../../../../../../../assets/nearIcon.svg';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../../react-vault';

const getBalance: any = async (getAccountBalance: any, accountId: any, setBalance: any) => {
  if (!accountId) return;
  const balance = await getAccountBalance({ accountId });
  setBalance(balance);
};

export const BalanceLabel = ({ form }) => {
  const { control } = form;
  const [balance, setBalance] = useState(null);
  const getAccountBalance = useStoreEffect((store: any) => store.transactions.getAccountBalance);
  const accountId = useWatch({ control, name: 'signerId.value' });

  useEffect(() => {
    getBalance(getAccountBalance, accountId, setBalance);
  }, [accountId]);

  if (!balance) return;

  return (
    <div className={cn.container}>
      <p className={cn.balance}>{balance}</p>
      <img className={cn.nearIcon} src={nearIcon} alt="#" />
    </div>
  );
};
