import { effect } from '../../../../../../../react-vault/index.js';
import { parseSeedPhrase, KEY_DERIVATION_PATH } from 'near-seed-phrase';

export const importFromSeedPhrase = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, reset } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const addKeyToList = slice.getActions((slice) => slice.addKeyToList);

  try {
    const { seedPhrase, derivationPath } = formValues;
    const { publicKey, secretKey: privateKey } = parseSeedPhrase(seedPhrase, derivationPath);

    const key = await backend.sendRequest('nearProtocol.keys.create', {
      publicKey,
      spaceId,
      networkId,
      privateKey,
      seedPhrase,
      derivationPath,
    });

    addKeyToList(key);
    reset({ publicKey, seedPhrase: '', derivationPath: KEY_DERIVATION_PATH });
  } catch (e) {
    console.log(e);
  }
});
