import { entity } from '@react-vault';
import { sendRequest } from './sendRequest.js';
import { configure } from './configure.js';
// Account
import { getAccount } from './methods/account/getAccount.js';
import { getAccountBalance } from './methods/account/getAccountBalance.js';
import { getAccountChanges } from './methods/account/getAccountChanges.js';
// Contract
import { getContractWasm } from './methods/contract/getContractWasm.js';
import { getContractWasmChanges } from './methods/contract/getContractWasmChanges.js';
import { getContractState } from './methods/contract/getContractState.js';
import { getContractStateChanges } from './methods/contract/getContractStateChanges.js';
import { callContractViewMethod } from './methods/contract/callContractViewMethod.js';
// Keys
import { getAccountKey } from './methods/keys/getAccountKey.js';
import { getAccountKeys } from './methods/keys/getAccountKeys.js';
import { getChangesForAccountKey } from './methods/keys/getChangesForAccountKey.js';
import { getChangesForAccountKeys } from './methods/keys/getChangesForAccountKeys.js';
// Transactions
import { createAndSendTransaction } from './methods/transactions/createAndSendTransaction/createAndSendTransaction.js';
import { sendSignedTransaction } from './methods/transactions/sendSignedTransaction.js';
import { getTransaction } from './methods/transactions/getTransaction.js';
import { getDetailedTransaction } from './methods/transactions/getDetailedTransaction.js';
import { getReceipt } from './methods/transactions/getReceipt.js';
// Block
import { getBlock } from './methods/block/getBlock.js';
import { getBlockChanges } from './methods/block/getBlockChanges.js';
import { getChunk } from './methods/block/getChunk.js';
// Protocol
import { getGenesisConfig } from './methods/protocol/geGenesisConfig.js';
import { getProtocolConfig } from './methods/protocol/getProtocolConfig.js';
// Network
import { getNodeStatus } from './methods/network/getNodeStatus.js';
import { getNetworkInfo } from './methods/network/getNetworkInfo.js';
import { getGasPrice } from './methods/network/getGasPrice.js';
// Validation
import { getValidators } from './methods/validators/getValidators.js';
import { getMaintenanceWindows } from './methods/validators/getMaintenanceWindows.js';

class RpcProvider {
  constructor(store) {
    this.store = store;
    this.rpcs = [];
  }
  // rpc should be an object, similar to RPC from database and has { url, headers }
  specify = (rpc) => {
    this.rpcs = [rpc];
  };

  configure = configure;
  sendRequest = sendRequest;

  // Account
  getAccount = getAccount;
  getAccountBalance = getAccountBalance;
  getAccountChanges = getAccountChanges;
  // Contract
  getContractWasm = getContractWasm;
  getContractWasmChanges = getContractWasmChanges;
  getContractState = getContractState;
  getContractStateChanges = getContractStateChanges;
  callContractViewMethod = callContractViewMethod;
  //Keys
  getAccountKey = getAccountKey;
  getAccountKeys = getAccountKeys;
  getChangesForAccountKey = getChangesForAccountKey;
  getChangesForAccountKeys = getChangesForAccountKeys;
  // Block
  getBlock = getBlock;
  getBlockChanges = getBlockChanges;
  getChunk = getChunk;
  // Transactions
  sendSignedTransaction = sendSignedTransaction;
  createAndSendTransaction = createAndSendTransaction;
  getTransaction = getTransaction;
  getDetailedTransaction = getDetailedTransaction;
  getReceipt = getReceipt;
  // Protocol
  getGenesisConfig = getGenesisConfig;
  getProtocolConfig = getProtocolConfig;
  // Network
  getNodeStatus = getNodeStatus;
  getNetworkInfo = getNetworkInfo;
  getGasPrice = getGasPrice;
  // Validators
  getValidators = getValidators;
  getMaintenanceWindows = getMaintenanceWindows;
}

export const rpcProvider = entity(({ store }) => new RpcProvider(store));
