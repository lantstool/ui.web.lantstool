import { effect } from '../../../../react-vault';

export const loadContractsOnce = effect(async ({ slice, store }: any) => {
  const isContractsLoadedToState = slice.getState((slice: any) => slice.isContractsLoadedToState);
  if (isContractsLoadedToState) return;

  const [idb] = store.getEntities((store: any) => store.idb);
  const { spaceId } = store.getState((store: any) => store.networks.current);
  const setContractsOnce = slice.getActions((slice: any) => slice.setContractsOnce);

  try {
    const contracts = await idb.getAllFromIndex(
      'contracts',
      'spaceId_createdAt',
      IDBKeyRange.bound([spaceId,  -Infinity], [spaceId, Infinity]),
    );
    setContractsOnce(contracts);
  } catch (e) {
    console.log(e);
  }
});
