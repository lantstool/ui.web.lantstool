import { transactions, utils } from 'near-api-js';

export const transfer = (action: any) =>
  transactions.transfer(utils.format.parseNearAmount(action.amount));
