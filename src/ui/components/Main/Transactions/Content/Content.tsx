import { useStoreState } from '../../../../../react-vault';
import { useParams } from 'react-router-dom';
import { Transaction } from './Transaction/Transaction';
import cn from './Content.module.css';

export const Content = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const { transactionId }: any = useParams();

  const transaction = transactions.map[transactionId];

  if (!transaction) return <div>No Tx</div>;

  return (
    <div key={transactionId} className={cn.content}>
      <Transaction transaction={transaction} />
    </div>
  );
};
