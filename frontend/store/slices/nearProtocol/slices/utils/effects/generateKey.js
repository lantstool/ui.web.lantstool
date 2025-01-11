import { effect } from '@react-vault';
import { KEY_DERIVATION_PATH, generateSeedPhrase } from 'near-seed-phrase';
import { utils } from 'near-api-js';

const createImplicitAccount = (pubKeyString) => {
  const publicKey = utils.PublicKey.fromString(pubKeyString);
  const rawBytes = publicKey.data;
  return Buffer.from(rawBytes).toString('hex');
};

export const generateKey = effect(async ({ slice }) => {
  const setGeneratedKey = slice.getActions((slice) => slice.setGeneratedKey);
  const { seedPhrase, secretKey: privateKey, publicKey } = generateSeedPhrase();
  setGeneratedKey({
    seedPhrase,
    privateKey,
    publicKey,
    derivationPath: KEY_DERIVATION_PATH,
    implicitAccount: createImplicitAccount(publicKey),
  });
});
