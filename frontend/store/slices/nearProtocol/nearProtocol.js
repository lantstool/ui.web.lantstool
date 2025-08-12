// actions
import { setIsSidebarMinimized } from './actions/setIsSidebarMinimized.js';
import { resetState } from './actions/resetState.js';
import { editSidebarSize } from './actions/editSidebarSize.js';
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
import { contractsMethods } from './slices/contractsMethods/contractsMethods.js';
import { folders } from './slices/folders/folders.js';

export const nearProtocol = {
  // actions
  setIsSidebarMinimized,
  resetState,
  editSidebarSize,
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
  contractsMethods,
  folders,
};
