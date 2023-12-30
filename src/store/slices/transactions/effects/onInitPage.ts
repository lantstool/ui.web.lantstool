import { effect } from '../../../../react-vault';

export const onInitPage = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);

  try {
    const transactions = await idb.getAllFromIndex('transactions', 'networkId', '1n');
    const c = await idb.countFromIndex('transactions', 'networkId', '1n');
    console.log(transactions);
    console.log(c);

    payload(false);
    initPage({ transactions });
  } catch (e) {
    console.log(e);
  }
});
