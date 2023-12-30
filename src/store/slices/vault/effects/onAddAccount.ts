import { effect } from '../../../../react-vault';
import { replaceDotsToString } from '../helpers/regularExpressions.ts';

export const onAddAccount = effect(async ({ payload, slice, store }: any) => {
  const { closeModal, data, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const addAccount = slice.getActions((slice: any) => slice.addAccount);
  const accountId = data.accountId;
  const modifiedAccountId = replaceDotsToString(accountId);

  try {
    const account = {
      accountId,
      list: [],
      map: {},
    };
    await idb.add('vault', account);
    addAccount({ account });

    navigate(`/vault/${modifiedAccountId}`);
    closeModal(false);
  } catch (e) {
    console.log(e);
  }
});
