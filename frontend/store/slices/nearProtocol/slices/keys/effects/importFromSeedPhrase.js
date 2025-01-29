import { effect } from '@react-vault';
import { parseSeedPhrase } from 'near-seed-phrase';

export const importFromSeedPhrase = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, closeModal, setKey } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const addKeyToList = slice.getActions((slice) => slice.addKeyToList);
  const setNotification = store.getActions((store) => store.setNotification);

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

    setKey(publicKey);
    addKeyToList(key);
    setNotification({ isOpen: true, message: 'Key imported successfully', variant: 'success' });
    closeModal();
  } catch (e) {
    console.log(e);
  }
});
