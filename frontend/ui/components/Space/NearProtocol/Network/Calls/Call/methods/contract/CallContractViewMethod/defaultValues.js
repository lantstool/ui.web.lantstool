import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.callContractViewMethod,
  contractId: null,
  methodName: null,
  args: '',
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
