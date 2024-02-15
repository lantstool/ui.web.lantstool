import { effect } from '../../../../react-vault';

export const getCallsCount = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const counter = await idb.get('calls-counter', [spaceId, networkId]);
    return counter.count + 1;
  } catch (e) {
    console.log(e);
  }
});
