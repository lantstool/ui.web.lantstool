import { getContractWasm } from './getContractWasm/index.js';
import { getContractWasmChanges } from './getContractWasmChanges/index.js';
import { getContractState } from './getContractState/index.js';
import { getContractStateChanges } from './getContractStateChanges/index.js';
import { callContractViewMethod } from './callContractViewMethod/index.js';

export const contract = {
  getContractWasm,
  getContractWasmChanges,
  getContractState,
  getContractStateChanges,
  callContractViewMethod,
};
