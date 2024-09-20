import { effect } from '../../../../../react-vault/index.js';

export const editNetwork = effect(async ({ payload, slice, store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const updateNetwork = slice.getActions((slice) => slice.updateNetwork);

  try {
    await idb.put('networks', payload);
    updateNetwork(payload);
  } catch (e) {
    console.log(e);
  }
});
