import { transactions, utils } from 'near-api-js';

const getGas = (action) =>
  action.gas.unit.value === 'TGas' ? Number(action.gas.amount) * 1000000000000 : action.gas.amount;

const getDeposit = (action) =>
  action.deposit.unit.value === 'NEAR'
    ? utils.format.parseNearAmount(action.deposit.amount)
    : action.deposit.amount;

const getArgs = (action) => {
  try {
    return JSON.parse(action.args);
  } catch (e) {
    return '';
  }
};

export const functionCall = (action) =>
  transactions.functionCall(
    action.methodName.value,
    getArgs(action),
    getGas(action),
    getDeposit(action),
  );
