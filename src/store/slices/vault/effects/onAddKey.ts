import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

export const onAddKey = effect(async ({ payload, slice, store }: any) => {
  const { publicKey, privateKey, seedPhrase, accountId, storageType } = payload;

  const [idb] = store.getEntities((store: any) => store.idb);
  const addKey = slice.getActions((slice: any) => slice.addKey);
  const rpc = store.getState((store: any) => store.networks.current.url.rpc);

  try {
    const provider = new JsonRpcProvider({ url: rpc });

    const response: any = await provider.query({
      request_type: 'view_access_key',
      finality: 'final',
      account_id: accountId,
      public_key: publicKey,
    });

    const keyData = {
      accountId,
      publicKey,
      privateKey,
      seedPhrase,
      permission: response.permission,
      storageType,
    };

    const record = await idb.get('accounts', accountId);
    record.list.push(publicKey);
    record.map[publicKey] = keyData;
    await idb.put('accounts', record);

    addKey({ keyData, accountId });
  } catch (e) {
    console.log(e);
  }
});
