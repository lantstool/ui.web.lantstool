import { effect } from '../../../../react-vault';
import { replaceDotsToString } from '../helpers/regularExpressions.ts';

const getNextRoute = (accList: any, activeTxId: string, networkId: string) => {
  if (accList.length === 1) return `/${networkId}/vault`;
  const index = accList.findIndex((id: any) => id === activeTxId);
  if (0 < index) return `/${networkId}/vault/${replaceDotsToString(accList[index - 1])}`;
  if (0 === index) return `/${networkId}/vault/${replaceDotsToString(accList[index + 1])}`;
};

export const onRemoveAccount = effect(async ({ payload, slice, store }: any) => {
  const { accountId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeAccount = slice.getActions((slice: any) => slice.removeAccount);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const accId = accountId.accountId;

  try {
    const list = slice.getState((slice: any) => slice.list);
    const nextRoute = getNextRoute(list, accId, networkId);

    await idb.delete('accounts', accId);
    removeAccount(accId);
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});
