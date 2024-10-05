import { effect } from '../../../../../../../react-vault/index.js';
import { KeyPair } from 'near-api-js';

export const importFromPrivateKey = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, reset } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const addKeyToList = slice.getActions((slice) => slice.addKeyToList);

  try {
    const { privateKey } = formValues;
    const publicKey = KeyPair.fromString(formValues.privateKey).getPublicKey().toString();

    const key = await backend.sendRequest('nearProtocol.keys.create', {
      publicKey,
      spaceId,
      networkId,
      privateKey,
      seedPhrase: '',
      derivationPath: '',
    });

    addKeyToList(key);
    reset({ publicKey, privateKey: '' });
  } catch (e) {
    console.log(e);
  }
});
