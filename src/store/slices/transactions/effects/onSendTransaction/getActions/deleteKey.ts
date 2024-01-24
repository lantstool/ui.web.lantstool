import { transactions, utils } from 'near-api-js';

export const deleteKey = (action: any) => {
  return transactions.deleteKey(utils.PublicKey.from(action.accessKey.value));
};
