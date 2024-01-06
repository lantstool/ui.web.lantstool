import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

export const onGetAccessKeyList = effect(async ({ payload, store, slice }: any) => {
  const { accountId } = payload;
  const getAccessKeyList = slice.getActions((slice: any) => slice.getAccessKeyList);
  const { url } = store.getState((store: any) => store.networks.current);

  try {
    const provider = new JsonRpcProvider({ url: url.rpc });

    const keys = await provider.query({
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: accountId,
    });

    getAccessKeyList(keys);
  } catch (e) {
    console.log(e);
  }
});
