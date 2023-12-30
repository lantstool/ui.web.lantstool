import { effect } from '../../../../react-vault';

export const onRemoveKey = effect(async ({ payload, slice, store }: any) => {
  const { accountId, publicKey } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeKey = slice.getActions((slice: any) => slice.removeKey);

  try {
    const record = await idb.get('vault', accountId);

    record.list = record.list.filter((item: any) => item !== publicKey);
    delete record.map[publicKey];

    await idb.put('vault', record);
    removeKey({ accountId, publicKey });
  } catch (e) {
    console.log(e);
  }
});
