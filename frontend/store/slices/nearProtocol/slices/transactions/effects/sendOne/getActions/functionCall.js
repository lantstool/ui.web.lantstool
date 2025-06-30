import { transactions, utils } from 'near-api-js';
import JSON5 from 'json5';

const getGas = (action) =>
  action.gas.unit.value === 'TGas' ? Number(action.gas.amount) * 1000000000000 : action.gas.amount;

const getDeposit = (action) =>
  action.deposit.unit.value === 'NEAR'
    ? utils.format.parseNearAmount(action.deposit.amount)
    : action.deposit.amount;

const json5ToJson = (args) => {
  try {
    return JSON5.parse(args)
  } catch (e) {
    return '';
  }
};

const getArgs = (action) => {
  try {
    return json5ToJson(action.args);
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
