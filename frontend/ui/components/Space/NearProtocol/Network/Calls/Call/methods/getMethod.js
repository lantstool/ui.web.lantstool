import { GetAccount } from './account/GetAccount.jsx';
import { GetAccountChanges } from './account/GetAccountChanges/GetAccountChanges.jsx';
import { GetContractWasm } from './contract/GetContractWasm.jsx';
import { GetContractState } from './contract/GetContractState.jsx';
import { GetContractWasmChanges } from './contract/GetContractWasmChanges.jsx';
import { GetContractStateChanges } from './contract/GetContractStateChanges.jsx';
import { CallContractViewMethod } from './contract/CallContractViewMethod/CallContractViewMethod.jsx';
import { GetKey } from './keys/GetKey.jsx';

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
};

export const getMethod = (method) => (!methods[method] ? null : methods[method]);
