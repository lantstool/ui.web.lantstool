import { effect } from '../../../../../../../react-vault/index.js';

export const save = effect(async ({ payload, store }) => {
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
