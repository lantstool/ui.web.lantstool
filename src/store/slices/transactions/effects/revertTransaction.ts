import { effect } from '../../../../react-vault';

// TODO reuse this function in Form component
const getFormValues = (transaction: any) => ({
  transactionId: transaction.transactionId,
  actions: transaction.actions,
  signerId: transaction.signerId,
  signerKey: transaction.signerKey,
  receiver: transaction.receiver,
  results: transaction.results,
});

export const revertTransaction = effect(({ payload: form, slice }: any) => {
  const values = form.getValues();
  const transactionId = values.transactionId;
  const oldTransaction = slice.getState((slice: any) => slice.map[transactionId]);
  const putTemporaryFormValues = slice.getActions((slice: any) => slice.putTemporaryFormValues);
  putTemporaryFormValues({ transactionId, values: null });
  form.reset(getFormValues(oldTransaction));
});
