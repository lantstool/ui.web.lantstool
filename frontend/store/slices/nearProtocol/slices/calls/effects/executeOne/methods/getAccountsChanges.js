import { getParams } from './helpers/getParams.js';

export const getAccountsChanges = (rpc, params) => rpc.account.accountChanges(getParams(params));
