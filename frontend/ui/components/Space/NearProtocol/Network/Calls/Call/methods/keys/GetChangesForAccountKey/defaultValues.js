import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getChangesForAccountKey,
  accountKeyPairs: [{ accountId: null, publicKey: null }],
  blockTarget: 'specific',
  finality: config.finality.final,
  blockId: '',
};
