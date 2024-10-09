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

export const save = effect(async ({ payload, slice, store }) => {
  const { form, transactionId } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  const body = form.getValues();
  console.log(body);

  try {
    await backend.sendRequest('nearProtocol.transactions.updateTxBody', {
      body,
      transactionId,
    });
    // TODO: clear draft. Check if it's ok to save invalid data
    // We want to reset isDirty state
    form.reset(body);
  } catch (e) {
    console.log(e);
  }
});
