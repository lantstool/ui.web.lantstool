import { getTransaction } from './GetTransaction/index.js';
import { getDetailedTransaction } from './GetDetailedTransaction/index.js';
import { getReceipt } from './GetReceipt/index.js';

export const transactions = {
  getTransaction,
  getDetailedTransaction,
  getReceipt,
};
