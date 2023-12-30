import { effect } from '../../../../react-vault';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

export const onAddKey = effect(async ({ payload, slice, store }: any) => {
  const { publicKey, privateKey, seedPhrase, accountId, storageType } = payload;

  const [idb] = store.getEntities((store: any) => store.idb);
  const addKey = slice.getActions((slice: any) => slice.addKey);

  try {
    const provider = new JsonRpcProvider({ url: `https://rpc.testnet.near.org` });

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

    const record = await idb.get('vault', accountId);
    record.list.push(publicKey);
    record.map[publicKey] = keyData
    await idb.put('vault', record);

    addKey({ keyData, accountId });
  } catch (e) {
    console.log(e);
  }
});
