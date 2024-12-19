import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getChangesForAccountKeys,
  accountIds: [{ accountId: null }],
  blockTarget: 'specific',
  finality: config.finality.final,
  blockId: '',
};
