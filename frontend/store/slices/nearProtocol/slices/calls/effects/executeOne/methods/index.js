import { getAccount } from './getAccount.js';
import { getAccountChanges } from './getAccountChanges.js';
import { getContractWasm } from './getContractWasm.js';
import { getContractWasmChanges } from './getContractWasmChanges.js';
import { getContractState } from './getContractState.js';
import { getContractStateChanges } from './getContractStateChanges.js';
import { callContractViewMethod } from './callContractViewMethod.js';
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
