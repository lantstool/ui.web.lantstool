import { transactions, utils } from 'near-api-js';

export const transfer = (action) => {
  const amount =
    action.quantity.unit.value === 'NEAR'
      ? utils.format.parseNearAmount(action.quantity.amount)
      : action.quantity.amount;

  return transactions.transfer(BigInt(amount));
};
