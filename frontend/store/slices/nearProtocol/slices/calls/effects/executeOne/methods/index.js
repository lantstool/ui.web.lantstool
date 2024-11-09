import { getAccount } from './account/getAccount.js';
import { getAccountChanges } from './account/getAccountChanges.js';
import { getContractWasm } from './contract/getContractWasm.js';
import { getContractWasmChanges } from './contract/getContractWasmChanges.js';
import { getContractState } from './contract/getContractState.js';
import { getContractStateChanges } from './contract/getContractStateChanges.js';
import { callContractViewMethod } from './contract/callContractViewMethod.js';
import { keys } from './keys/index.js';

export const methods = {
  getAccount,
  getAccountChanges,
  getContractWasm,
  getContractWasmChanges,
  getContractState,
  getContractStateChanges,
  callContractViewMethod,
  ...keys,
};
