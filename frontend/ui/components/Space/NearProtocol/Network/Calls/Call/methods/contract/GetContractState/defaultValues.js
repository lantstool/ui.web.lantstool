import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getContractState,
  contractId: null,
  keyPrefix: '',
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
