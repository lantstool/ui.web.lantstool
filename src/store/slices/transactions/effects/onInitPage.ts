import { effect } from '../../../../react-vault';

const networkId = 'a';

export const onInitPage = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);

  try {
    const transactions = await idb.getAllFromIndex(
      'transactions',
      'networkIdOrder',
      IDBKeyRange.bound([networkId, 0], [networkId, Infinity]),
    );

    const data = await idb.getAllFromIndex(
      'spaces',
      'members',
      'alice',
    );
    console.log(data);

    payload(false);
    initPage({ transactions });
  } catch (e) {
    console.log(e);
  }
});
