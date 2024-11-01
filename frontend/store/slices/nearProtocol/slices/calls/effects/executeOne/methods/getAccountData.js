import { getParams } from './helpers/getParams.js';

export const getAccountData = (rpc, params) => {
  return rpc.account.viewAccount(getParams(params));
};
