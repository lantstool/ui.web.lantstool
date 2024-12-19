import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getTransaction,
  transactionHash: '',
  signerId: null,
  waitUntil: config.waitUntil.FINAL,
};
