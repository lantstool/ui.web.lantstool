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
import { GetAccountKey } from './keys/GetAccountKey/GetAccountKey.jsx';
import { GetChangesForAccountKey } from './keys/GetChangesForAccountKey/GetChangesForAccountKey.jsx';
import { GetAccountKeys } from './keys/GetAccountKeys.jsx';
import { GetChangesForAccountKeys } from './keys/GetChangesForAccountKeys.jsx';
// Block
import { GetBlock } from './block/GetBlock.jsx';
import { GetBlockChanges } from './block/GetBlockChanges.jsx';
import { GetChunk } from './block/GetChunk/GetChunk.jsx';
// Transactions
import { GetTransaction } from './transactions/GetTransaction.jsx';

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
  getAccountKey: GetAccountKey,
  getChangesForAccountKey: GetChangesForAccountKey,
  getAccountKeys: GetAccountKeys,
  getChangesForAccountKeys: GetChangesForAccountKeys,
  // Block
  getBlock: GetBlock,
  getBlockChanges: GetBlockChanges,
  getChunk: GetChunk,
  // Transactions
  getTransaction: GetTransaction,
};

export const getMethod = (method) => (!methods[method] ? null : methods[method]);
