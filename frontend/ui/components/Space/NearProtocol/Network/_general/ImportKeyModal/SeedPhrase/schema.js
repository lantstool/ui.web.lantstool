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
        const publicKey = parseSeedPhrase(value, dPath).publicKey;
        const key = await getKey({ spaceId, networkId, publicKey });
        return !key;
      }),
  });
};
