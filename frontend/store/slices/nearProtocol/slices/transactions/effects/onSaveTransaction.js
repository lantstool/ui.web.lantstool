import { effect } from '../../../../../../../react-vault/index.js';

const getFormValues = (transaction, values) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
    results: values.results,
  };
};

const getNewTransaction = (values, oldTransaction) => {
  return {
    createdAt: oldTransaction.createdAt,
    name: oldTransaction.name,
    networkId: oldTransaction.networkId,
    order: oldTransaction.order,
    spaceId: oldTransaction.spaceId,
    actions: values.actions,
    receiver: values.receiver,
    signerId: values.signerId,
    signerKey: values.signerKey,
    transactionId: values.transactionId,
  };
};

export const onSaveTransaction = effect(async ({ payload: form, slice, store }) => {
  const values = form.getValues();
  const transactionId = values.transactionId;
  const [idb] = store.getEntities((store) => store.idb);
  const updateTransaction = slice.getActions((slice) => slice.updateTransaction);
  const oldTransaction = store.getState((store) => store.transactions.map[transactionId]);
  const putTemporaryFormValues = slice.getActions((slice) => slice.putTemporaryFormValues);

  try {
    const newTransaction = getNewTransaction(values, oldTransaction);

    await idb.put('transactions', newTransaction);
    putTemporaryFormValues({ transactionId, values: null });
    // Update transaction and add result for state
    updateTransaction({ ...newTransaction, results: values.results });
    form.reset(getFormValues(newTransaction, values));
  } catch (e) {
    console.log(e);
  }
});
