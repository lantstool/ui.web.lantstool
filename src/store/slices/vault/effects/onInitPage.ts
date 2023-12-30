import { effect } from '../../../../react-vault';

export const onInitPage = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const initPage = slice.getActions((slice: any) => slice.initPage);

  try {
    const vault = await idb.getAll('accounts');
    payload(false);
    initPage({ vault });
  } catch (e) {
    console.log(e);
  }
});
