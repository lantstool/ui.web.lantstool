import { effect } from '../../../react-vault';

const getNextRoute = (accList: any, activeTxId: string) => {
  if (accList.length === 1) return '/vault';
  const index = accList.findIndex((id: any) => id === activeTxId);
  if (0 < index) return `/vault/${accList[index - 1].replace(/\./g, '-dot-')}`;
  if (0 === index) return `/vault/${accList[index + 1].replace(/\./g, '-dot-')}`;
};

export const onRemoveAccount = effect(async ({ payload, slice, store }: any) => {
  const { accountId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeAccount = slice.getActions((slice: any) => slice.removeAccount);
  const accId = accountId.accountId;
  try {
    const list = slice.getState((slice: any) => slice.list);
    const nextRoute = getNextRoute(list, accId);

    await idb.delete('vault', accId);
    removeAccount(accId);
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});
