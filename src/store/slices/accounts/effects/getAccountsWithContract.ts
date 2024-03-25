import { effect } from '../../../../react-vault';

export const getAccountsWithContract = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const accounts = await idb.getAllFromIndex(
      'accounts',
      'spaceId_networkId_importedAt',
      IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
    );
    return Object.values(accounts).filter((account: any) => account.contractId);
  } catch (e) {
    console.log(e);
  }
});
