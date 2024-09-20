import { effect } from '../../../../../react-vault/index.js';
import { v4 } from 'uuid';

const duplicateTx = (transaction) => {
  const transactionId = v4();

  return {
    ...transaction,
    transactionId,
    name: `${transaction.name} - copy`,
    createdAt: new Date(),
    order: transaction.order + 1,
  };
};

const updateTxsOrder = async (idb, order, networkId, spaceId) => {
  const tx = idb.transaction('transactions', 'readwrite');
  const index = tx.store.index('spaceId_networkId_order');

  for await (const cursor of index.iterate(
    IDBKeyRange.bound([spaceId, networkId, order], [spaceId, networkId, Infinity]),
  )) {
    const transaction = { ...cursor.value, order: cursor.value.order + 1 };
    idb.put('transactions', transaction);
  }

  await tx.done;
};

export const onDuplicateTransaction = effect(async ({ payload, slice, store }) => {
  const { transactionId, navigate } = payload;
  const duplicateTransaction = slice.getActions((slice) => slice.duplicateTransaction);
  const networkId = store.getState((store) => store.networks.current.networkId);
  const [idb] = store.getEntities((store) => store.idb);
  const map = store.getState((store) => store.transactions.map);
  const spaceId = store.getState((store) => store.networks.current.spaceId);
  const transaction = map[transactionId];

  try {
    const duplicate = duplicateTx(transaction);
    const txOrder = transaction.order + 1;

    await updateTxsOrder(idb, txOrder, networkId, spaceId);

    const counter = await idb.get('transactions-counter', [spaceId, networkId]);
    counter.count += 1;

    await Promise.all([
      idb.add('transactions', duplicate),
      idb.put('transactions-counter', counter),
    ]);

    const transactions = await idb.getAllFromIndex(
      'transactions',
      'spaceId_networkId_order',
      IDBKeyRange.bound([spaceId, networkId, 0], [spaceId, networkId, Infinity]),
    );

    duplicateTransaction({ transactions });
    navigate(`/${networkId}/transactions/${duplicate.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
