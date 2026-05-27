import { effect } from '@react-vault';

export const revertChanges = effect(async ({ store, payload }) => {
  const { transactionId, form } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.getTx', {
      transactionId,
    });
    form.reset(transaction.body);
  } catch (e) {
    console.log(e);
  }
});
