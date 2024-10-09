import { useParams } from 'react-router-dom';
import { Topbar } from './Topbar/Topbar.jsx';
import { Form } from './Form/Form.jsx';
import { Result } from './Result/Result.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../../react-vault/index.js';
import { useLoader } from '../../../../../../hooks/useLoader.js';
import cn from './Transaction.module.scss';

export const Transaction = () => {
  const { transactionId } = useParams();
  const transaction = useStoreState((store) => store.nearProtocol.transactions.transaction);
  const getTx = useStoreEffect((store) => store.nearProtocol.transactions.getTx);

  useLoader(getTx, transactionId, [transactionId]);

  if (!transaction) return null;

  return (
    <div className={cn.transaction}>
      <Topbar transaction={transaction} />
      <Form transaction={transaction} />
      {/*{!transaction.results.isOpen ? (*/}
      {/*  <Form transaction={transaction} />*/}
      {/*) : (*/}
      {/*  <Result transaction={transaction} />*/}
      {/*)}*/}
    </div>
  );
};
