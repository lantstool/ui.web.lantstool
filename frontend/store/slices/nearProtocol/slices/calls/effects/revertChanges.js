import { effect } from '../../../../../../../react-vault/index.js';

export const revertChanges = effect(({ payload, slice }) => {
  const { transactionId, form } = payload;
  const transaction = slice.getState((slice) => slice.transaction);
  const setDraft = slice.getActions((slice) => slice.setDraft);

  setDraft({ transactionId, draft: null });
  form.reset(transaction.body);
});
