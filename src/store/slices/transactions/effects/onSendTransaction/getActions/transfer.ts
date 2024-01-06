import { transactions, utils } from 'near-api-js';

export const transfer = (action: any) =>
  // @ts-ignore
  transactions.transfer(utils.format.parseNearAmount(action.amount));
