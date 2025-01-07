import { transactions, utils } from 'near-api-js';

export const deleteKey = (action) => {
  return transactions.deleteKey(utils.PublicKey.from(action.publicKey.value));
};
