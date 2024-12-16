import { transactions, utils } from 'near-api-js';
import BN from 'bn.js';

const gasFormat = (action) =>
  action.gasType.value === 'tGas' ? new BN(Number(action.gas) * 1000000000000) : action.gas;

const allowanceFormat = (action) =>
  action.depositType.value === 'NEAR'
    ? utils.format.parseNearAmount(action.deposit)
    : action.deposit;

export const functionCall = (action) =>
  transactions.functionCall(
    action.methodName.value,
    JSON.parse(action.arguments),
    gasFormat(action),
    allowanceFormat(action),
  );
