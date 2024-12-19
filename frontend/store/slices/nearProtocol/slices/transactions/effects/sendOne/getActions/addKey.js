import { utils, transactions } from 'near-api-js';

const functionCallKey = (restrictions) => {
  const { allowedAllowance, receiverId, allowedMethods, allowance, methodNames, allowanceType } =
    restrictions;

  const allowanceFormat =
    allowanceType.value === 'NEAR' ? utils.format.parseNearAmount(allowance) : allowance;

  const allowanceValue = allowedAllowance === 'Unlimited' ? null : allowanceFormat;
  const methodNamesValue = allowedMethods === 'All' ? [] : methodNames.map((el) => el.name.value);

  return transactions.functionCallAccessKey(receiverId.value, methodNamesValue, allowanceValue);
};

export const addKey = (action) => {
  const { type, restrictions } = action.permission;

  const accessKey =
    type === 'FullAccess' ? transactions.fullAccessKey() : functionCallKey(restrictions);

  return transactions.addKey(utils.PublicKey.from(action.publicKey), accessKey);
};
