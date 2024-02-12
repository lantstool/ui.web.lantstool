import { getOnceAccounts } from './effects/getOnceAccounts.ts';
import { addTestAccounts } from './effects/addTestAccounts.ts';
import { getAccountsIds } from './effects/getAccountsIds';
import { getContractMethods } from './effects/getContractMethods.ts';
import { setAccounts } from "./actions/setAccounts.ts";

export const accounts = {
  ids: [],
  records: {},
  // actions
  setAccounts,
  // effects
  getOnceAccounts,
  addTestAccounts,
  getAccountsIds,
  getContractMethods,
};
