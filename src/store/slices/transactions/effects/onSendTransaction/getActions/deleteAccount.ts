import { transactions } from 'near-api-js';

export const deleteAccount = (action: any) => {
  return transactions.deleteAccount(action.beneficiaryId);
};
