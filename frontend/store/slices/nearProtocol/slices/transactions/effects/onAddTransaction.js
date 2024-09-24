import { effect } from '../../../../../../../react-vault/index.js';
import { v1 } from 'uuid';

const createTx = (order, transactionName, networkId) => {
  const transactionId = v1();

  return {
    spaceId: 'space1',
    networkId,
    transactionId,
    name: transactionName,
    createdAt: new Date(),
    order,
    signerId: '',
    signerKey: '',
    receiver: '',
    actions: [],
  };
};

export const onAddTransaction = effect(async ({ payload, slice, store }) => {
  const { navigate, transactionName } = payload;
  const networkId = store.getState((store) => store.networks.current.networkId);
  const [idb] = store.getEntities((store) => store.idb);
  const addTransaction = slice.getActions((slice) => slice.addTransaction);

  try {
    const [txOrder, txCounter] = await Promise.all([
      idb.countFromIndex(
        'transactions',
        'spaceId_networkId_order',
        IDBKeyRange.bound(['space1', networkId, 0], ['space1', networkId, Infinity]),
      ),
      idb.get('transactions-counter', ['space1', networkId]),
    ]);
    txCounter.count += 1;

    const transaction = createTx(txOrder, transactionName, networkId);

    await Promise.all([
      idb.add('transactions', transaction),
      idb.put('transactions-counter', txCounter),
    ]);

    addTransaction(transaction);
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
