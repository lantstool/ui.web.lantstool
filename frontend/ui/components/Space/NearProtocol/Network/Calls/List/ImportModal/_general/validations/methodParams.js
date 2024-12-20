import { array, object, string } from 'yup';
import { blockTargetSchema } from './blockTargetSchema.js';

const getAccount = object({
  accountId: string().defined(),
}).concat(blockTargetSchema);

const getAccountChanges = object({
  accountIds: array().of(string().required()).required(),
}).concat(blockTargetSchema);

export const methodParams = {
  getAccount,
  getAccountChanges,
};
