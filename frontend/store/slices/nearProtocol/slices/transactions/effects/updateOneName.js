import { effect } from '@react-vault';

export const updateOneName = effect(async ({ payload, slice, store }) => {
  const { transactionId } = payload;
  const { name } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editTxName = slice.getActions((slice) => slice.editTxName);

  try {
    editTxName({ name, transactionId });

    await backend.sendRequest('nearProtocol.transactions.updateOneName', {
      name,
      transactionId,
    });
  } catch (e) {
    console.log(e);
  }
});
