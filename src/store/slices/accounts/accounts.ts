import { addAccounts } from './effects/addAccounts';
import { getAccountsIds } from './effects/getAccountsIds';
import { getContractMethods } from "./effects/getContractMethods.ts";

export const accounts = {
  // effects
  addAccounts,
  getAccountsIds,
  getContractMethods,
};
