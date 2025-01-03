import { action } from '@react-vault';

export const setGeneratedKey = action(({ slice, payload }) => {
  slice.generatedKey.publicKey = payload.publicKey;
  slice.generatedKey.privateKey = payload.privateKey;
  slice.generatedKey.seedPhrase = payload.seedPhrase;
  slice.generatedKey.derivationPath = payload.derivationPath;
});
