import { effect } from '@react-vault';

export const create = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, navigate } = payload;
  const pushTxToList = slice.getActions((slice) => slice.pushTxToList);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.create', {
      spaceId,
      networkId,
    });
    pushTxToList(transaction);
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
