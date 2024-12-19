import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getAccount,
  accountId: null,
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
