import { transactions, utils } from 'near-api-js';

export const transfer = (action: any) => {
  const amount =
    action.amountType.value === 'NEAR'
      ? utils.format.parseNearAmount(action.amount)
      : action.amount;

  // @ts-ignore
  return transactions.transfer(amount);
};
