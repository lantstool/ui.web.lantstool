import { useStoreEffect } from '../../../../../react-vault';
import cn from './Empty.module.css';

export const Empty = () => {
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  return (
    <div className={cn.empty}>
      <div>
        <h3>No Tx Added</h3>
        <button onClick={onAddTransaction}>Add Transaction</button>
      </div>
    </div>
  );
};
