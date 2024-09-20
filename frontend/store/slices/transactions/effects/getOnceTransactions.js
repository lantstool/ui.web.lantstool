import { effect } from '../../../../../react-vault/index.js';

export const getOnceTransactions = effect(async ({ slice, store }) => {
  const isTransactionsLoadedToState = slice.getState((slice) => slice.isTransactionsLoadedToState);
  if (isTransactionsLoadedToState) return;

  const [idb] = store.getEntities((store) => store.idb);
  const setOnceTransactions = slice.getActions((slice) => slice.setOnceTransactions);
  const networkId = store.getState((store) => store.networks.current.networkId);

  try {
    const transactions = await idb.getAllFromIndex(
      'transactions',
      'spaceId_networkId_order',
      IDBKeyRange.bound(['space1', networkId, 0], ['space1', networkId, Infinity]),
    );

    setOnceTransactions({ transactions });
  } catch (e) {
    console.log(e);
  }
});
