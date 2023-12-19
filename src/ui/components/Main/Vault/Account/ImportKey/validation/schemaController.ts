import { seedPhraseSchema } from './schemes/seedPhraseSchema.ts';
import { privateKeySchema } from './schemes/privateKeySchema.ts';

export const schemaController = (
  step: any,
  accessKeyList: any,
  ref1: any,
  ref2: any,
  list: any,
) => {
  if (step === 'seedPhrase') {
    return seedPhraseSchema(accessKeyList, ref1, ref2, list);
  }
  if (step === 'privateKey') {
    return privateKeySchema(list, accessKeyList, ref1, ref2);
  }
};
