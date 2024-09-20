import { effect } from '../../../../../react-vault/index.js';

export const getTransactionCount = effect(async ({ store }) => {
  const networkId = store.getState((store) => store.networks.current.networkId);
  const [idb] = store.getEntities((store) => store.idb);
  try {
    const counter = await idb.get('transactions-counter', ['space1', networkId]);
    return counter.count + 1;
  } catch (e) {
    console.log(e);
  }
});
