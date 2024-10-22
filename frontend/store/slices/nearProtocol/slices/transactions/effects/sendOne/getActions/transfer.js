import { transactions, utils } from 'near-api-js';

export const transfer = (action) => {
  const amount =
    action.amountType.value === 'NEAR'
      ? utils.format.parseNearAmount(action.amount)
      : action.amount;

  return transactions.transfer(amount);
};
