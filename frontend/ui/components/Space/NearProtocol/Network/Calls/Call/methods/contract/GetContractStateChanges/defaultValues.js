import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getContractStateChanges,
  contractIds: [{ contractId: null }],
  keyPrefix: '',
  blockTarget: 'specific',
  finality: config.finality.final,
  blockId: '',
};
