import { utils, transactions } from 'near-api-js';

const getAllowance = (allowance) => {
  if (allowance.isUnlimited) return null;
  return allowance.unit.value === 'NEAR'
    ? utils.format.parseNearAmount(allowance.amount)
    : allowance.amount;
};

const getMethods = (methods) => {
  if (!methods.onlyCertain) return [];
  return methods.list.map((method) => method.methodName.value);
};

const functionCallKey = (restrictions) => {
  const { allowance, contractId, methods } = restrictions;
  return transactions.functionCallAccessKey(
    contractId.value,
    getMethods(methods),
    getAllowance(allowance),
  );
};

export const addKey = (action) => {
  const accessKey =
    action.permission === 'FullAccess'
      ? transactions.fullAccessKey()
      : functionCallKey(action.restrictions);

  return transactions.addKey(utils.PublicKey.from(action.publicKey.value), accessKey);
};
