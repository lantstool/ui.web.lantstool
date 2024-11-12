import { entity } from '@react-vault';
import { fetchJson } from '../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../helpers/toCamelCase.js';
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
import { sendTransaction } from './methods/transactions/sendTransaction.js';
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

// Validation

class RpcProvider {
  constructor(store) {
    this.store = store;
    this.url = null;
  }

  configure = async ({ spaceId, networkId }) => {
    const [backend] = this.store.getEntities((store) => store.backend);

    try {
      this.url = await backend.sendRequest('nearProtocol.networks.getActiveRpc', {
        spaceId,
        networkId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  sendRequest = async ({ body, responseNameConvention }) => {
    const { result, error } = await fetchJson(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 0,
        ...body,
      }),
    });

    if (error) throw new Error(JSON.stringify(error));
    if (responseNameConvention === 'snake_case') return result;
    if (responseNameConvention === 'camelCase') return toCamelCase(result);
  };

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
  sendTransaction = sendTransaction;
  getTransaction = getTransaction;
  getDetailedTransaction = getDetailedTransaction;
  getReceipt = getReceipt;
  // Protocol
  getGenesisConfig = getGenesisConfig;
  getProtocolConfig = getProtocolConfig;
  // Network
  getNodeStatus = getNodeStatus;
  getNetworkInfo = getNetworkInfo;
  // Validators
}

export const rpcProvider = entity(({ store }) => new RpcProvider(store));
