import { getContractWasm } from './getContractWasm.js';
import { getContractWasmChanges } from './getContractWasmChanges.js';
import { getContractState } from './getContractState.js';
import { getContractStateChanges } from './getContractStateChanges.js';
import { callContractViewMethod } from './callContractViewMethod/callContractViewMethod.js';

export const contract = {
  getContractWasm,
  getContractWasmChanges,
  getContractState,
  getContractStateChanges,
  callContractViewMethod,
};
