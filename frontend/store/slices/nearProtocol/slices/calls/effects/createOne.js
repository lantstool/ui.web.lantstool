import { effect } from '../../../../../../../react-vault/index.js';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, formValues, navigate, closeModal } = payload;
  const pushTxToList = slice.getActions((slice) => slice.pushTxToList);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.create', {
      spaceId,
      networkId,
      name: formValues.name,
    });
    pushTxToList(transaction);
    closeModal();
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
