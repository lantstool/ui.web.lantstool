import { effect } from '../../../../../../../react-vault/index.js';

export const getTx = effect(async ({ store, slice, payload: transactionId }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setTx = slice.getActions((slice) => slice.setTx);

  try {
    const transaction = await backend.sendRequest('nearProtocol.transactions.getTx', transactionId);
    console.log(transaction);
    setTx(transaction);
  } catch (e) {
    console.log(e);
  }
});
