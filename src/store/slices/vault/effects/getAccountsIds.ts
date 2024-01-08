import { effect } from '../../../../react-vault';

export const getAccountsIds = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    return await idb.getAllKeysFromIndex('accounts', 'networkId', networkId);
  } catch (e) {
    console.log(e);
  }
});
