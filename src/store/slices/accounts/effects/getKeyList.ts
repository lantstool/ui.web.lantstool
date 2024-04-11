import { effect } from '../../../../react-vault';
import { viewAccessKeyList } from '../../../helpers/rpc/viewAccessKeyList.ts';
import { toCamelCase } from '../../../helpers/toCamelCase.ts';

export const getKeyList = effect(async ({ payload: accountId, store, slice }: any) => {
  const { rpc } = store.getState((store: any) => store.networks.current.url);
  const setKeyList = slice.getActions((slice: any) => slice.setKeyList);
  const loadKeysOnce = store.getEffects((store: any) => store.keys.loadKeysOnce);

  try {
    await loadKeysOnce();
    const keyList = store.getState((store: any) => store.keys.ids);

    const response = await viewAccessKeyList(accountId, rpc);
    setKeyList({ accountId, accountKeys: toCamelCase(response.result.keys), keyList });
  } catch (e) {
    console.log(e);
  }
});
