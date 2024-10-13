import { effects } from './effects/index.js';
import { networks } from './slices/networks/networks.js';
import { transactions } from './slices/transactions/transactions.js';
import { calls } from './slices/calls/calls.js';
import { accounts } from './slices/accounts/accounts.js';
import { keys } from './slices/keys/keys.js';

export const nearProtocol = {
  ...effects,
  // slices
  networks,
  transactions,
  calls,
  accounts,
  keys,
};
