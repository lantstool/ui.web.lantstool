import { Topbar } from './Topbar/Topbar.tsx';
import { Form } from './Form/Form.tsx';
import cn from './Transaction.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { Result } from './Result/Result.tsx';

export const Transaction = () => {
  const { transactionId } = useParams();
  const transaction: any = useStoreState((store: any) => store.transactions.map[transactionId]);

  if (!transaction) return null;

  return (
    <div className={cn.transaction}>
      <Topbar transaction={transaction} />
      {!transaction.results.isOpen ? (
        <Form transaction={transaction} />
      ) : (
        <Result transaction={transaction} />
      )}
    </div>
  );
};
