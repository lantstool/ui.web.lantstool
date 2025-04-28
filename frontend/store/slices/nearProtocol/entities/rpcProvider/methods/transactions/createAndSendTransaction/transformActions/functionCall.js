import { transactions, utils } from 'near-api-js';

const getGas = (action) =>
  action.gas.unit === 'TGas' ? Number(action.gas.amount) * 1000000000000 : action.gas.amount;

const getDeposit = (action) =>
  action.deposit.unit === 'NEAR'
    ? utils.format.parseNearAmount(action.deposit.amount)
    : BigInt(action.deposit.amount);

export const functionCall = (action) =>
  transactions.functionCall(
    action.methodName.value,
    action.args,
    getGas(action),
    getDeposit(action),
  );
