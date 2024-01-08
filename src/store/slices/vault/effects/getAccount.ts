import { effect } from '../../../../react-vault';

export const getAccount = effect(async ({ payload, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    return await idb.get('accounts', payload.accountId);
  } catch (e) {
    console.log(e);
  }
});
