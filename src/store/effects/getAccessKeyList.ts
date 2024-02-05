import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../react-vault';

export const getAccessKeyList = effect(async ({ payload: accountId, store }: any) => {
  const { url } = store.getState((store: any) => store.networks.current);

  try {
    const provider = new JsonRpcProvider({ url: url.rpc });

    return await provider.query({
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: accountId,
    });
  } catch (e) {
    console.log(e);
  }
});
