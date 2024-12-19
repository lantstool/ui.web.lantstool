import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getAccountKey,
  accountId: null,
  publicKey: null,
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
