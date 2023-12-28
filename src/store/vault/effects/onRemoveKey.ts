import { effect } from '../../../react-vault';

export const onRemoveKey = effect(async ({ payload, slice, store }: any) => {
  const { accountId, publicKey } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeKey = slice.getActions((slice: any) => slice.removeKey);

  try {
    const record = await idb.get('vault', accountId);

    const { [publicKey]: removedKey, ...updatedMap } = record.map;
    const updatedList = record.list.filter((item: any) => item !== publicKey);

    await idb.put('vault', { ...record, list: updatedList, map: updatedMap });
    removeKey({ accountId, publicKey });
  } catch (e) {
    console.log(e);
  }
});
