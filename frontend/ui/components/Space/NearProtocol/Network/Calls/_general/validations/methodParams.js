import { array, mixed, object, string } from 'yup';
import { blockTargetSchema } from './blockTargetSchema.js';
import { waitUntilSchema } from './waitUntilSchema.js';

const isString = (str) => typeof str === 'string';

// account
const getAccount = object({
  accountId: string().defined(),
}).concat(blockTargetSchema);

const getAccountChanges = object({
  accountIds: array().of(string().required()).defined(),
}).concat(blockTargetSchema);

// block
const getBlock = blockTargetSchema;
const getBlockChanges = blockTargetSchema;

const getChunk = object({
  chunkId: string().nullable(),
  blockId: string().nullable(),
  shardId: string().nullable(),
}).test('chunk-or-block', 'Object must contain either chunkId or blockId + shardId', (value) => {
  if (!value) return false;
  const { chunkId, blockId, shardId } = value;

  if (isString(chunkId)) return !isString(blockId) && !isString(shardId);
  if (isString(blockId) && isString(shardId)) return !isString(chunkId);
  return false;
});

// contract
const callContractViewMethod = object({
  contractId: string().defined(),
  methodName: string().defined(),
  args: mixed().defined(),
}).concat(blockTargetSchema);

const getContractState = object({
  contractId: string().defined(),
  keyPrefix: string().defined(),
}).concat(blockTargetSchema);

const getContractStateChanges = object({
  contractIds: array().of(string()).defined(),
  keyPrefix: string().defined(),
}).concat(blockTargetSchema);

const getContractWasm = object({
  contractId: string().defined(),
}).concat(blockTargetSchema);

const getContractWasmChanges = object({
  contractIds: array().of(string()).defined(),
}).concat(blockTargetSchema);

// keys
const getAccountKey = object({
  accountId: string().defined(),
  publicKey: string().defined(),
}).concat(blockTargetSchema);

const getAccountKeys = object({
  accountId: string().defined(),
}).concat(blockTargetSchema);

const getChangesForAccountKey = object({
  accountKeyPairs: array()
    .of(
      object({
        accountId: string().defined(),
        publicKey: string().defined(),
      }),
    )
    .defined(),
}).concat(blockTargetSchema);

const getChangesForAccountKeys = object({
  accountIds: array().of(string().defined()).defined(),
}).concat(blockTargetSchema);

// network
const getGasPrice = object({
  blockId: string().defined().nullable(),
});
const getNetworkInfo = object().notRequired();
const getNodeStatus = object().notRequired();

// protocol
const getGenesisConfig = object().notRequired();
const getProtocolConfig = object().concat(blockTargetSchema);

// transaction
const getDetailedTransaction = object({
  transactionHash: string().defined(),
  signerId: string().defined(),
}).concat(waitUntilSchema);

const getReceipt = object({
  receiptId: string().defined(),
});

const getTransaction = object({
  transactionHash: string().defined(),
  signerId: string().defined(),
}).concat(waitUntilSchema);

// validators
const getMaintenanceWindows = object({
  validatorId: string().defined(),
});

const getValidators = object({
  epochId: string().defined().nullable(),
});

export const methodParams = {
  // account
  getAccount,
  getAccountChanges,
  // block
  getBlock,
  getBlockChanges,
  getChunk,
  // contract
  callContractViewMethod,
  getContractState,
  getContractStateChanges,
  getContractWasm,
  getContractWasmChanges,
  // keys
  getAccountKey,
  getAccountKeys,
  getChangesForAccountKey,
  getChangesForAccountKeys,
  // network
  getGasPrice,
  getNetworkInfo,
  getNodeStatus,
  // protocol
  getGenesisConfig,
  getProtocolConfig,
  // transaction
  getDetailedTransaction,
  getReceipt,
  getTransaction,
  // validators
  getMaintenanceWindows,
  getValidators,
};
