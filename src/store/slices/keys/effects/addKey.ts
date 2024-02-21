import { effect } from '../../../../react-vault';
import { KeyPair } from 'near-api-js';
import { parseSeedPhrase } from 'near-seed-phrase';

const createdKey = (data: any, wallet: any, networkId: any, spaceId: any, derivationPath: any) => {
  return {
    spaceId,
    networkId,
    wallet: wallet,
    publicKey: data.publicKey,
    privateKey: data.secretKey || data.privateKey,
    seedPhrase: data.seedPhrase || null,
    derivationPath,
    importedAt: Date.now(),
  };
};

const keyFromPrivateKey: any = (data: any, setValue: any) => {
  const pk: any = KeyPair.fromString(data.privateKey).getPublicKey().toString();
  setValue('publicKey', pk);
  return {
    publicKey: pk,
    privateKey: data,
  };
};

const keyFromSeedPhrase: any = (data: any, setValue: any, derivationPath: any) => {
  const phraseData: any = parseSeedPhrase(data.seedPhrase, derivationPath);
  setValue('publicKey', phraseData.publicKey);
  return phraseData;
};

export const addKey = effect(async ({ slice, store, payload }: any) => {
  const { data, setValue, wallet, derivationPath } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const createKey = slice.getActions((slice: any) => slice.createKey);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);

  try {
    const newData = derivationPath
      ? keyFromSeedPhrase(data, setValue, derivationPath)
      : keyFromPrivateKey(data, setValue);

    const key = createdKey(newData, wallet, networkId, spaceId, derivationPath);

    await idb.put('keys', key);
    createKey(key);
  } catch (e) {
    console.log(e);
  }
});
