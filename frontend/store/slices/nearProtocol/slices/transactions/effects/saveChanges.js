import { effect } from '@react-vault';

export const saveChanges = effect(async ({ store, slice, payload }) => {
  const { form, transactionId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);
  const body = form.getValues();

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.updateTxBody', {
      body,
      transactionId,
    });
    setupDraft(transaction);
  } catch (e) {
    console.log(e);
  }
});
