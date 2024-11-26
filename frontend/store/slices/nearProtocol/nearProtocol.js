// actions
import { setMinimize } from './actions/setMinimize.js';
import { resetState } from './actions/resetState.js';
// entities
import { rpcProvider } from './entities/rpcProvider/rpcProvider.js';
// slices
import { networks } from './slices/networks/networks.js';
import { transactions } from './slices/transactions/transactions.js';
import { calls } from './slices/calls/calls.js';
import { accounts } from './slices/accounts/accounts.js';
import { keys } from './slices/keys/keys.js';

export const nearProtocol = {
  // state
  isMinimize: false,
  // actions
  setMinimize,
  resetState,
  // entities
  rpcProvider,
  // slices
  networks,
  transactions,
  calls,
  accounts,
  keys,
};
