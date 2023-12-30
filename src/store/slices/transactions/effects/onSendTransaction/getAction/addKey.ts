import { utils, transactions } from 'near-api-js';

export const addKey = (action: any) => {
  const { type, restrictions } = action.permission;

  // const getFunctionCallKey = () => {};

  const accessKey =
    type === 'FullAccess'
      ? transactions.fullAccessKey()
      : transactions.functionCallAccessKey(restrictions.receiverId, []);

  return transactions.addKey(utils.PublicKey.from(action.publicKey), accessKey);
};
