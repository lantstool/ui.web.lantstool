import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getGasPrice,
  blockTarget: 'latest',
  blockId: null,
};
