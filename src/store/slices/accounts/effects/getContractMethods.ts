import { effect } from '../../../../react-vault';

export const getContractMethods = effect(async ({ store, payload: contractId }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    // TODO check if account has a contract
    const account = await idb.get('accounts', [spaceId, networkId, contractId]);
    return account.contract?.methods || [];
  } catch (e) {
    console.log(e);
  }
});
