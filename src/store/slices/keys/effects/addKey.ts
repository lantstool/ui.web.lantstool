import { effect } from '../../../../react-vault';

const createdKey = (data: any, wallet: any, networkId: any, spaceId: any, derivationPath: any) => {
  return {
    spaceId,
    networkId,
    wallet: wallet,
    publicKey: data.publicKey || null,
    privateKey: data.secretKey || data.privateKey,
    seedPhrase: data.seedPhrase || null,
    derivationPath,
    importedAt: Date.now(),
  };
};

export const addKey = effect(async ({ slice, store, payload }: any) => {
  const { data, wallet, derivationPath } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const createKey = slice.getActions((slice: any) => slice.createKey);
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const spaceId = store.getState((store: any) => store.networks.current.spaceId);

  try {
    const key = createdKey(data, wallet, networkId, spaceId, derivationPath);

    await idb.put('keys', key);
    createKey(key);
  } catch (e) {
    console.log(e);
  }
});
