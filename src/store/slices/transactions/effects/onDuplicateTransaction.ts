import { effect } from '../../../../react-vault';
import { v4 } from 'uuid';

const duplicateTx = (transaction: any) => {
  const transactionId = v4();

  return {
    ...transaction,
    transactionId,
    name: `${transaction.name} - copy`,
    createdAt: new Date(),
    order: transaction.order + 1,
  };
};

const updateTxsOrder = async (idb: any, order: number, networkId: string) => {
  const tx = idb.transaction('transactions', 'readwrite');
  const index = tx.store.index('networkIdOrder');

  const updatedTxsOrder: any = [];

  for await (const cursor of index.iterate(
    IDBKeyRange.bound([networkId, order], [networkId, Infinity]),
  )) {
    const transaction = { ...cursor.value, order: cursor.value.order + 1 };
    updatedTxsOrder.push({ [transaction.transactionId]: transaction.order });
    // idb.put('transactions', transaction);
    cursor.update(transaction);
  }

  await tx.done;

  return updatedTxsOrder;
};

export const onDuplicateTransaction = effect(async ({ payload, slice, store }: any) => {
  const { transactionId, navigate } = payload;
  const duplicateTransaction = slice.getActions((slice: any) => slice.duplicateTransaction);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const [idb] = store.getEntities((store: any) => store.idb);
  const map = store.getState((store: any) => store.transactions.map);
  const list = store.getState((store: any) => store.transactions.list);

  const transaction = map[transactionId];

  try {
    const duplicate = duplicateTx(transaction);
    const txOrder = transaction.order + 1;

    const updateOrder = await updateTxsOrder(idb, txOrder, networkId);

    const counter = await idb.get('transactions-counter', networkId);
    counter.count += 1;

    await Promise.all([
      idb.add('transactions', duplicate),
      idb.put('transactions-counter', counter),
    ]);

    duplicateTransaction({ updateOrder, duplicate });
    // navigate(`${duplicate.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
