import { transactions, utils } from 'near-api-js';
import BN from 'bn.js';

const tGas = (terraGas) => new BN(Number(terraGas) * 1000000000000);

export const functionCall = (action) =>
  transactions.functionCall(
    action.methodName,
    JSON.parse(action.arguments),
    tGas(action.gas),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    utils.format.parseNearAmount(action.deposit),
  );
