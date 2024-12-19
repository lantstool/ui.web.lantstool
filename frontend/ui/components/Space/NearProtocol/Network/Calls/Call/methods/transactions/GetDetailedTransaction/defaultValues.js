import { config } from '../../_general/config.js';

export const defaultValues = {
  method: config.methodNames.getDetailedTransaction,
  transactionHash: '',
  signerId: null,
  waitUntil: config.waitUntil.FINAL,
};
