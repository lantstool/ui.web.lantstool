import { effect } from '../../../../react-vault';


export const getTransactionCount = effect(async ({ store }: any) => {
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const [idb] = store.getEntities((store: any) => store.idb);
  try {
    const counter = await idb.get('transactions-counter', networkId);
    return counter.count + 1;
  } catch (e) {
    console.log(e);
  }
});
