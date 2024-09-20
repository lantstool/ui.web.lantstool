import { effect } from '../../../../../react-vault/index.js';

// TODO reuse this function in Form component
const getFormValues = (transaction) => ({
  transactionId: transaction.transactionId,
  actions: transaction.actions,
  signerId: transaction.signerId,
  signerKey: transaction.signerKey,
  receiver: transaction.receiver,
  results: transaction.results,
});

export const revertTransaction = effect(({ payload: form, slice }) => {
  const values = form.getValues();
  const transactionId = values.transactionId;
  const oldTransaction = slice.getState((slice) => slice.map[transactionId]);
  const putTemporaryFormValues = slice.getActions((slice) => slice.putTemporaryFormValues);
  putTemporaryFormValues({ transactionId, values: null });
  form.reset(getFormValues(oldTransaction));
});
