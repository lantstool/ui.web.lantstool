import { useStoreState, useStoreAction, useStoreEffect } from '../../../../../react-vault';
import { Transaction } from './Transaction/Transaction.tsx';
import cn from './Sidebar.module.css';

export const Sidebar = () => {
  const transactions = useStoreState((store: any) => store.transactions);
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  const setActiveTransaction = useStoreAction(
    (store: any) => store.transactions.setActiveTransaction,
  );

  return (
    <div className={cn.container}>
      {transactions.list.map((id: any) => (
        <Transaction
          key={id}
          transaction={transactions.map[id]}
          activeTxId={transactions.active}
          id={id}
          setActiveTransaction={setActiveTransaction}
        />
      ))}
      <button className={cn.addTransactionButton} onClick={onAddTransaction}>
        Add Transaction
      </button>
    </div>
  );
};
