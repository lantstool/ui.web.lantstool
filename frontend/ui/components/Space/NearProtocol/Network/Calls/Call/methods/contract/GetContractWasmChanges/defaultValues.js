import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getContractWasmChanges,
  contractIds: [{ contractId: null }],
  blockTarget: 'specific',
  finality: config.finality.final,
  blockId: '',
};
