import { GetAccount } from './GetAccount/GetAccount.jsx';
import { GetAccountChanges } from './GetAccountChanges/GetAccountChanges.jsx';
import { GetContractWasm } from './GetContractWasm.jsx';
import { GetContractState } from './GetContractState.jsx';
import { GetContractWasmChanges } from './GetContractWasmChanges.jsx';
import { GetContractStateChanges } from './GetContractStateChanges.jsx';
import { CallContractViewMethod } from './CallContractViewMethod/CallContractViewMethod.jsx';

const methods = {
  getAccount: GetAccount,
  getAccountChanges: GetAccountChanges,
  getContractWasm: GetContractWasm,
  getContractState: GetContractState,
  getContractWasmChanges: GetContractWasmChanges,
  getContractStateChanges: GetContractStateChanges,
  callContractViewMethod: CallContractViewMethod,
};

export const getMethod = (method) => (!methods[method] ? null : methods[method]);
