import { effect } from '@react-vault';

export const onMountTransaction = effect(async ({ store, slice, payload: transactionId }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);
  const draft = slice.getState((slice) => slice.drafts[transactionId]);

  // We don't need to prepare and setup base draft from DB data
  // if user already was on this transaction page - he may have unsaved changes
  if (draft) return;

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.getTx', {
      transactionId,
    });
    setupDraft(transaction);
  } catch (e) {
    console.log(e);
  }
});
