import { effect } from '@react-vault';

export const onMountKeyGenerator = effect(async ({ slice }) => {
  const generatedKey = slice.getState((slice) => slice.generatedKey);
  const generateKey = slice.getEffects((slice) => slice.generateKey);

  if (!generatedKey.seedPhrase) generateKey();
});
