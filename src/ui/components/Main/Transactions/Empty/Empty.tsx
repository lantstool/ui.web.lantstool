import { useStoreEffect } from '../../../../../react-vault';
import cn from './Empty.module.css';
import { useNavigate } from 'react-router-dom';

export const Empty = () => {
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  const navigate = useNavigate();

  const addTransaction = () => onAddTransaction({ navigate });

  return (
    <div className={cn.empty}>
      <div>
        <h3>No Tx Added</h3>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
    </div>
  );
};
