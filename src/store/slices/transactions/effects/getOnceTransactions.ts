import { effect } from '../../../../react-vault';

export const getOnceTransactions = effect(async ({ slice, store }: any) => {
  const isTransactionsLoadedToState = slice.getState(
    (slice: any) => slice.isTransactionsLoadedToState,
  );
  if (isTransactionsLoadedToState) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const setOnceTransactions = slice.getActions((slice: any) => slice.setOnceTransactions);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

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
