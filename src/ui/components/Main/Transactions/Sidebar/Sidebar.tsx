import { useMatch } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { Transaction } from './Transaction/Transaction.tsx';
import cn from './Sidebar.module.css';
import { AddTransaction } from './AddTransaction/AddTransaction.tsx';

export const Sidebar = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const match: any = useMatch('/transactions/:transactionId');

  return (
    <div className={cn.container}>
      <input className={cn.search} />
      <div className={cn.wrapper}>
        {transactions.list.map((id: any) => (
          <Transaction
            key={id}
            transaction={transactions.map[id]}
            isActive={id === match?.params?.transactionId}
          />
        ))}
      </div>
      <AddTransaction />
    </div>
  );
};
