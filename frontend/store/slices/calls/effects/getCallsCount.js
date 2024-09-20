import { effect } from '../../../../../react-vault/index.js';

export const getCallsCount = effect(async ({ store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const spaceId = store.getState((store) => store.networks.current.spaceId);
  const networkId = store.getState((store) => store.networks.current.networkId);

  try {
    const counter = await idb.get('calls-counter', [spaceId, networkId]);
    return counter.count + 1;
  } catch (e) {
    console.log(e);
  }
});
