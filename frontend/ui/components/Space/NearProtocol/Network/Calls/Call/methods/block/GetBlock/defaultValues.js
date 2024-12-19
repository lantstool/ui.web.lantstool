import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getBlock,
  blockTarget: 'latest',
  finality: config.finality.final,
  blockId: '',
};
