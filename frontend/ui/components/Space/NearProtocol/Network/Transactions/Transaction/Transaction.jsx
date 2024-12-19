import { useParams } from 'react-router-dom';
import { Form } from './Form/Form.jsx';
import { Result } from './Result/Result.jsx';
import { useStoreState, useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import cn from './Transaction.module.scss';

export const Transaction = () => {
  const { transactionId } = useParams();
  const onMountTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onMountTransaction,
  );
  const transactionDraft = useStoreState(
    (store) => store.nearProtocol.transactions.drafts[transactionId],
    [transactionId],
  );
  const txResult = useStoreState(
    (store) => store.nearProtocol.transactions.results[transactionId],
    [transactionId],
  );

  useSaveToHistory();
  useLoader(onMountTransaction, transactionId, [transactionId]);

  // We use it instead of 'isLoading' to avoid a screen blinking
  if (!transactionDraft) return null;

  return (
    <div className={cn.transaction}>
      {txResult?.isOpen ? (
        <Result txResult={txResult} />
      ) : (
        <Form transaction={transactionDraft.origin} draft={transactionDraft.body} />
      )}
    </div>
  );
};
