import { array, object, string } from 'yup';
import { blockTargetSchema } from './blockTargetSchema.js';

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

export const methodParams = {
  // account
  getAccount,
  getAccountChanges,
  // block
  getBlock,
  getBlockChanges,
  getChunk,
};
