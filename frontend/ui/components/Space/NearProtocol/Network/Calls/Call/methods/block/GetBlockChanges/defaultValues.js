import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getBlockChanges,
  blockTarget: 'specific',
  finality: config.finality.final,
  blockId: '',
};
