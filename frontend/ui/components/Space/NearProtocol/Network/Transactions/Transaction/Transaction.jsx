import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Topbar } from './Topbar/Topbar.jsx';
import { Form } from './Form/Form.jsx';
import { Result } from './Result/Result.jsx';
import {
  useStoreState,
  useStoreEffect,
  useStoreEntity,
} from '../../../../../../../../react-vault/index.js';
import { useLoader } from '../../../../../../hooks/useLoader.js';
import cn from './Transaction.module.scss';

export const Transaction = () => {
  const { spaceId, networkId, transactionId } = useParams();
  const transaction = useStoreState((store) => store.nearProtocol.transactions.transaction);
  const txResult = useStoreState((store) => store.nearProtocol.transactions.results[transactionId]);
  const getTx = useStoreEffect((store) => store.nearProtocol.transactions.getTx);
  const history = useStoreEntity((store) => store.history);

  useLoader(getTx, transactionId, [transactionId]);

  useEffect(() => {
    history.update([
      '',
      'space',
      spaceId,
      'near-protocol',
      networkId,
      'transactions',
      transactionId,
    ]);
  }, [transactionId]);

  // We use it instead of 'isLoading' to avoid a screen blinking
  if (!transaction) return null;

  return (
    <div className={cn.transaction}>
      <Topbar transaction={transaction} />
      {txResult?.isOpen ? (
        <Result txResult={txResult} />
      ) : (
        <Form isResultExists={Boolean(txResult)} transaction={transaction} />
      )}
    </div>
  );
};
