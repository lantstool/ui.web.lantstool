import { getParams } from './helpers/getParams.js';

export const getAccountData = (rpc, params) => rpc.account.viewAccount(getParams(params));
