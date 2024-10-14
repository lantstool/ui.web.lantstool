import { transactions } from 'near-api-js';

export const deleteAccount = (action) => {
  return transactions.deleteAccount(action.beneficiaryId);
};
