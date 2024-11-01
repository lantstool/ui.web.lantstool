import { effect } from '@react-vault';

export const create = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, navigate } = payload;
  const pushTxToList = slice.getActions((slice) => slice.pushTxToList);
  const getCount = slice.getEffects((slice) => slice.getCount);

  try {
    const count = await getCount({ spaceId, networkId });
    const transaction = await backend.sendRequest('nearProtocol.transactions.create', {
      spaceId,
      networkId,
      name: `Transaction#${count + 1}`,
    });
    pushTxToList(transaction);
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
