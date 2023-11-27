import { createAccount } from './createAccount.ts';
import { addKey } from './addKey.ts';
import { transfer } from './transfer.ts';
import { functionCall } from "./functionCall.ts";

export const getAction = {
  createAccount,
  addKey,
  transfer,
  functionCall,
};
