import { effect } from '@react-vault';

export const revertChanges = effect(async ({ store, payload, slice }) => {
  const { transactionId, form } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.getTx', transactionId);
    setupDraft(transaction);
    form.reset(transaction.body);
  } catch (e) {
    console.log(e);
  }
});
