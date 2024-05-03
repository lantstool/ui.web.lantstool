import { effect } from '../../../../react-vault';
import { viewAccessKeyList } from '../../../helpers/rpc/viewAccessKeyList.js';
import { toCamelCase } from '../../../helpers/toCamelCase.js';

export const getKeyList = effect(async ({ payload: accountId, store, slice }) => {
  const { rpc } = store.getState((store) => store.networks.current.url);
  const setKeyList = slice.getActions((slice) => slice.setKeyList);
  const loadKeysOnce = store.getEffects((store) => store.keys.loadKeysOnce);

  try {
    await loadKeysOnce();
    const keyList = store.getState((store) => store.keys.ids);

    const response = await viewAccessKeyList(accountId, rpc);
    setKeyList({ accountId, accountKeys: toCamelCase(response.result.keys), keyList });
  } catch (e) {
    console.log(e);
  }
});
