import { effect } from '@react-vault';
import { KEY_DERIVATION_PATH, generateSeedPhrase } from 'near-seed-phrase';

export const generateKey = effect(async ({ slice }) => {
  const setGeneratedKey = slice.getActions((slice) => slice.setGeneratedKey);
  const { seedPhrase, secretKey: privateKey, publicKey } = generateSeedPhrase();
  setGeneratedKey({ seedPhrase, privateKey, publicKey, derivationPath: KEY_DERIVATION_PATH });
});
