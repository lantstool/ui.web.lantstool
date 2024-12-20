import { getContractWasm } from './GetContractWasm/index.js';
import { getContractWasmChanges } from './GetContractWasmChanges/index.js';
import { getContractState } from './GetContractState/index.js';
import { getContractStateChanges } from './GetContractStateChanges/index.js';
import { callContractViewMethod } from './CallContractViewMethod/index.js';

export const contract = {
  getContractWasm,
  getContractWasmChanges,
  getContractState,
  getContractStateChanges,
  callContractViewMethod,
};
