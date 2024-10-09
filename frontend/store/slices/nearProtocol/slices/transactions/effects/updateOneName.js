import { effect } from '../../../../../../../react-vault/index.js';

export const updateOneName = effect(async ({ payload, slice, store }) => {
  const { transactionId, closeModal } = payload;
  const { name } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editTxName = slice.getActions((slice) => slice.editTxName);

  try {
    await backend.sendRequest('nearProtocol.transactions.updateOneName', {
      name,
      transactionId,
    });
    editTxName({ name, transactionId });
    closeModal();
  } catch (e) {
    console.log(e);
  }
});
