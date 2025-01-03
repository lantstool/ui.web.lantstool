// actions
import { setIsSidebarMinimized } from './actions/setIsSidebarMinimized.js';
import { resetState } from './actions/resetState.js';
// entities
import { rpcProvider } from './entities/rpcProvider/rpcProvider.js';
import { effects } from './effects/index.js';
// slices
import { networks } from './slices/networks/networks.js';
import { transactions } from './slices/transactions/transactions.js';
import { calls } from './slices/calls/calls.js';
import { accounts } from './slices/accounts/accounts.js';
import { keys } from './slices/keys/keys.js';
import { utils } from './slices/utils/utils.js';

export const nearProtocol = {
  // actions
  setIsSidebarMinimized,
  resetState,
  // entities
  rpcProvider,
  ...effects,
  // slices
  networks,
  transactions,
  calls,
  accounts,
  keys,
  utils,
};
