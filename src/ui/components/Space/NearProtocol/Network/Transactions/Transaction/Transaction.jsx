import { Topbar } from './Topbar/Topbar.jsx';
import { Form } from './Form/Form.jsx';
import cn from './Transaction.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../../../react-vault/index.js';
import { Result } from './Result/Result.jsx';

export const Transaction = () => {
  const { transactionId } = useParams();
  const transaction = useStoreState((store) => store.transactions.map[transactionId]);

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
