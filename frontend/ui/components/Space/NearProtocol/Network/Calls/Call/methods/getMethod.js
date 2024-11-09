// Account
import { GetAccount } from './account/GetAccount.jsx';
import { GetAccountChanges } from './account/GetAccountChanges.jsx';
// Contract
import { GetContractWasm } from './contract/GetContractWasm.jsx';
import { GetContractState } from './contract/GetContractState.jsx';
import { GetContractWasmChanges } from './contract/GetContractWasmChanges.jsx';
import { GetContractStateChanges } from './contract/GetContractStateChanges.jsx';
import { CallContractViewMethod } from './contract/CallContractViewMethod/CallContractViewMethod.jsx';
// Keys
import { GetKey } from './keys/GetKey/GetKey.jsx';
import { GetKeys } from './keys/GetKeys.jsx';
import { GetAllKeyChanges } from './keys/GetAllKeyChanges.jsx';

const methods = {
  // Account
  getAccount: GetAccount,
  getAccountChanges: GetAccountChanges,
  // Contract
  getContractWasm: GetContractWasm,
  getContractState: GetContractState,
  getContractWasmChanges: GetContractWasmChanges,
  getContractStateChanges: GetContractStateChanges,
  callContractViewMethod: CallContractViewMethod,
  // Keys
  getKey: GetKey,
  getKeys: GetKeys,
  getAllKeyChanges: GetAllKeyChanges,
};

export const getMethod = (method) => (!methods[method] ? null : methods[method]);
