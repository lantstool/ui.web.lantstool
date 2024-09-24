import { effect } from '../../../../../../../react-vault/index.js';
import { KeyPair } from 'near-api-js';
import { parseSeedPhrase } from 'near-seed-phrase';

const createdKey = (data, wallet, networkId, spaceId, derivationPath) => {
  return {
    spaceId,
    networkId,
    wallet: wallet,
    publicKey: data.publicKey,
    privateKey: data.secretKey || data.privateKey,
    seedPhrase: data.seedPhrase || null,
    derivationPath: derivationPath || null,
    importedAt: Date.now(),
  };
};

const keyFromPrivateKey = (formValue, setValue) => {
  const pk = KeyPair.fromString(formValue.privateKey).getPublicKey().toString();
  setValue('publicKey', pk);
  return {
    publicKey: pk,
    privateKey: formValue.privateKey,
  };
};

const keyFromSeedPhrase = (formValue, setValue) => {
  const phraseData = parseSeedPhrase(formValue.seedPhrase, formValue.derivationPath);
  setValue('publicKey', phraseData.publicKey);
  return phraseData;
};

export const addKey = effect(async ({ slice, store, payload }) => {
  const { formValue, setValue, wallet, resetField } = payload;
  const { derivationPath } = formValue;
  const [idb] = store.getEntities((store) => store.idb);
  const createKey = slice.getActions((slice) => slice.createKey);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);

  try {
    const data = derivationPath
      ? keyFromSeedPhrase(formValue, setValue, resetField)
      : keyFromPrivateKey(formValue, setValue, resetField);

    const key = createdKey(data, wallet, networkId, spaceId, derivationPath);

    await idb.put('keys', key);
    createKey(key);

    derivationPath ? resetField('seedPhrase') : resetField('privateKey');
  } catch (e) {
    console.log(e);
  }
});
