import { GetAccount } from './methods/GetAccount/GetAccount.jsx';
import { GetAccountChanges } from './methods/GetAccountChanges/GetAccountChanges.jsx';
import { GetContractWasm } from './methods/GetContractWasm.jsx';
import { GetContractState } from './methods/GetContractState.jsx';
import { GetContractWasmChanges } from './methods/GetContractWasmChanges.jsx';
import { GetContractStateChanges } from './methods/GetContractStateChanges.jsx';
import { CallContractViewMethod } from './methods/CallContractViewMethod/CallContractViewMethod.jsx';

const fields = {
  getAccount: GetAccount,
  getAccountChanges: GetAccountChanges,
  getContractWasm: GetContractWasm,
  getContractState: GetContractState,
  getContractWasmChanges: GetContractWasmChanges,
  getContractStateChanges: GetContractStateChanges,
  callContractViewMethod: CallContractViewMethod,
};

export const getFields = (method) => (!fields[method?.value] ? null : fields[method?.value]);
