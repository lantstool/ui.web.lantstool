import * as yup from 'yup';
import { useStoreEffect } from '@react-vault';
import { parseSeedPhrase } from 'near-seed-phrase';

export const createSchema = (spaceId, networkId) => {
  const getKey = useStoreEffect((store) => store.nearProtocol.keys.getKey);
  return yup.object({
    seedPhrase: yup
      .string()
      .required('Empty field')
      .min(1)
      .max(208)
      .test('matches', 'This key already exists', async (value, values) => {
        const dPath = values.from[0].value.derivationPath;
        try {
          const publicKey = parseSeedPhrase(value, dPath).publicKey;
          if (publicKey){
            const key = await getKey({ spaceId, networkId, publicKey });
            return !key;
          }
        } catch (e) {
          return false;
        }
      }),
    derivationPath: yup
      .string()
      .required('Empty field')
      .min(1)
      .max(208)
      .test('matches', 'Invalid derivation path', async (value, values) => {
        const seedPhrase = values.from[0].value.seedPhrase;
        try {
          return parseSeedPhrase(seedPhrase, value);
        } catch (e) {
          return false;
        }
      }),
  });
};
