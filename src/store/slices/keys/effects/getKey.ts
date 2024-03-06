import { effect } from '../../../../react-vault';

export const getKey = effect(async ({ store, payload: publicKey }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const networkId = store.getState((slice: any) => slice.networks.current.networkId);

  try {
    return await idb.get('keys', ['space1', networkId, publicKey]);
  } catch (e) {
    console.log(e);
  }
});
