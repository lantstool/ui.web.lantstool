import { utils, transactions } from 'near-api-js';

export const addKey = (action: any) => {
  const { type, restrictions } = action.permission;
  const { allowedAllowance, methodNames, allowance, receiverId, allowedMethods } = restrictions;

  const formatAllowance = utils.format.parseNearAmount(allowance);
  const transformedMethodNames = methodNames.map((el: any) => el.name);

  const functionCallKey = () => {
    const allowance: any = allowedAllowance === 'Unlimited' ? null : formatAllowance;
    const methodNames = allowedMethods === 'All' ? [] : transformedMethodNames;

    return transactions.functionCallAccessKey(receiverId, methodNames, allowance);
  };

  const accessKey = type === 'FullAccess' ? transactions.fullAccessKey() : functionCallKey();

  return transactions.addKey(utils.PublicKey.from(action.publicKey), accessKey);
};
