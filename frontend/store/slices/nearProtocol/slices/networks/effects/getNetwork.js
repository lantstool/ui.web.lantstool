import { effect } from '../../../../../../../react-vault/index.js';

export const getNetwork = effect(async ({ payload: networkId, slice, store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const setCurrentNetwork = slice.getActions((slice) => slice.setCurrentNetwork);

  try {
    const network = await idb.get('networks', ['space1', networkId]);
    setCurrentNetwork(network);
  } catch (e) {
    console.log(e);
  }
});
