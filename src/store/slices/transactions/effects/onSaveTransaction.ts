import { effect } from '../../../../react-vault';

const getFormValues = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
    result: transaction.result,
    isOpen: transaction.isOpen,
  };
};

const getNewTransaction = (values: any, oldTransaction: any) => {
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

export const onSaveTransaction = effect(async ({ payload: form, slice, store }: any) => {
  const values = form.getValues();
  const transactionId = values.transactionId;
  const [idb] = store.getEntities((store: any) => store.idb);
  const updateTransaction = slice.getActions((slice: any) => slice.updateTransaction);
  const oldTransaction = store.getState((store: any) => store.transactions.map[transactionId]);
  const putTemporaryFormValues = slice.getActions((slice: any) => slice.putTemporaryFormValues);

  try {
    const newTransaction = getNewTransaction(values, oldTransaction);

    await idb.put('transactions', newTransaction);
    putTemporaryFormValues({ transactionId, values: null });
    updateTransaction(newTransaction);
    form.reset(getFormValues(newTransaction));
  } catch (e) {
    console.log(e);
  }
});
