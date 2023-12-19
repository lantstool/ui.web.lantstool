import { effect } from '../../../react-vault';

export const onAddKey = effect(async ({ payload, slice, store }: any) => {
  const { data, accountId } = payload;
  const { publicKey, seedPhrase, privateKey } = data;
  const [idb] = store.getEntities((store: any) => store.idb);
  const addKey = slice.getActions((slice: any) => slice.addKey);
  console.log(seedPhrase)
  try {
    const record = await idb.get('vault', accountId);
    record.list.push(publicKey);
    record.map = {
      ...record.map,
      [publicKey]: { accountId, publicKey, seedPhrase, privateKey },
    };
    await idb.put('vault', record);

    addKey({ data, accountId });
  } catch (e) {
    console.log(e);
  }
});
