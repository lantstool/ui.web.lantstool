import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getAccountKeys,
  accountId: null,
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
