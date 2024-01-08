import { effect } from '../../../../react-vault';
import { replaceDotsToString } from '../helpers/regularExpressions.ts';

export const onAddAccount = effect(async ({ payload, slice, store }: any) => {
  const { closeModal, data, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const addAccount = slice.getActions((slice: any) => slice.addAccount);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  const accountId = data.accountId;
  const modifiedAccountId = replaceDotsToString(accountId);

  const account = {
    accountId,
    networkId,
    list: [],
    map: {},
  };

  try {
    await idb.add('accounts', account);
    addAccount({ account });

    navigate(`/vault/${modifiedAccountId}`);
    closeModal(false);
  } catch (e) {
    console.log(e);
  }
});
