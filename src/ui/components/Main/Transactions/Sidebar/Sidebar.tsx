import { useMatch, useNavigate } from "react-router-dom";
import { useStoreState, useStoreAction, useStoreEffect } from '../../../../../react-vault';
import { Transaction } from './Transaction/Transaction.tsx';
import cn from './Sidebar.module.css';

export const Sidebar = ({ activeTransactionId }: any ) => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  const navigate = useNavigate();
  const match: any = useMatch('/transactions/:transactionId');

  const addTransaction = () => onAddTransaction({ navigate });

  return (
    <div className={cn.container}>
      {transactions.list.map((id: any) => (
        <Transaction
          key={id}
          transaction={transactions.map[id]}
          isActive={id === match?.params?.transactionId}
        />
      ))}
      <button className={cn.addTransactionButton} onClick={addTransaction}>
        Add Transaction
      </button>
    </div>
  );
};
