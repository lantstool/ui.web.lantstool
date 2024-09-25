import { effect } from '../../../../../../../react-vault/index.js';

export const create = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, formValues, navigate, closeModal } = payload;
  // const addTransaction = slice.getActions((slice) => slice.addTransaction);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.create', {
      spaceId,
      networkId,
      name: formValues.name,
    });
    console.log(transaction);

    closeModal();
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
