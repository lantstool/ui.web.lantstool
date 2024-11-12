import { setMinimize } from './actions/setMinimize.js';
// entities
import { rpcProvider } from './entities/rpcProvider.js';
// slices
import { networks } from './slices/networks/networks.js';
import { transactions } from './slices/transactions/transactions.js';
import { calls } from './slices/calls/calls.js';
import { accounts } from './slices/accounts/accounts.js';
import { keys } from './slices/keys/keys.js';

export const nearProtocol = {
  isMinimize: false,
  // actions
  setMinimize,
  rpcProvider,
  // slices
  networks,
  transactions,
  calls,
  accounts,
  keys,
};
