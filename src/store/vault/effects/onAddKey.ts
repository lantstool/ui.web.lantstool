import { effect } from '../../../react-vault';

export const onAddKey = effect(async ({ payload, slice, store }: any) => {
  const { data, accountId } = payload;

  const account = {
    accountId,
    publicKey: data.publicKey,
    privateKey: data.privateKey || data.secretKey,
    seedPhrase: data.seedPhrase || null,
  };

  const [idb] = store.getEntities((store: any) => store.idb);
  const addKey = slice.getActions((slice: any) => slice.addKey);

  try {
    const record = await idb.get('vault', accountId);
    record.list.push(data.publicKey);
    record.map = {
      ...record.map,
      [data.publicKey]: account,
    };
    await idb.put('vault', record);

    addKey({ account, accountId });
  } catch (e) {
    console.log(e);
  }
});
