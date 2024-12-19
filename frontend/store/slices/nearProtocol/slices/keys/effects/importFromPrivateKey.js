import { effect } from '@react-vault';
import { KeyPair } from 'near-api-js';

export const importFromPrivateKey = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, closeModal } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const addKeyToList = slice.getActions((slice) => slice.addKeyToList);
  const setNotification = store.getActions((store) => store.setNotification);

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
    setNotification({ isOpen: true, message: 'Key imported successfully', variant: 'success' });
    closeModal();
  } catch (e) {
    console.log(e);
  }
});
