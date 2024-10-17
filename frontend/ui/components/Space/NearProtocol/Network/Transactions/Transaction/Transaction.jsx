import { useParams } from 'react-router-dom';
import { Form } from './Form/Form.jsx';
import { Result } from './Result/Result.jsx';
import { useStoreState, useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import cn from './Transaction.module.scss';

export const Transaction = () => {
  const { transactionId } = useParams();
  const transaction = useStoreState((store) => store.nearProtocol.transactions.transaction);
  const txResult = useStoreState((store) => store.nearProtocol.transactions.results[transactionId]);
  const getTx = useStoreEffect((store) => store.nearProtocol.transactions.getTx);

  useLoader(getTx, transactionId, [transactionId]);
  useSaveToHistory();
  // We use it instead of 'isLoading' to avoid a screen blinking
  if (!transaction) return null;

  return (
    <div className={cn.transaction}>
      {txResult?.isOpen ? (
        <Result txResult={txResult} />
      ) : (
        <Form transaction={transaction} />
      )}
    </div>
  );
};
