import { effect } from '../../../../react-vault/index.js';

export const deleteNetwork = effect(async ({ payload: networkId, slice, store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const removeNetwork = slice.getActions((slice) => slice.removeNetwork);

  try {
    await idb.delete('networks', networkId);
    removeNetwork(networkId);
  } catch (e) {
    console.log(e);
  }
});
