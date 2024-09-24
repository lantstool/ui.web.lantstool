import { effect } from '../../../../../../../react-vault/index.js';

export const getKey = effect(async ({ store, payload: publicKey }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const networkId = store.getState((slice) => slice.networks.current.networkId);

  try {
    return await idb.get('keys', ['space1', networkId, publicKey]);
  } catch (e) {
    console.log(e);
  }
});
