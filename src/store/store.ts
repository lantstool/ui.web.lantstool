import { createStore } from '../react-vault';
import { transactions } from './slices/transactions/transactions';
import { calls } from './slices/calls/calls.js';
import { keys } from './slices/keys/keys';
import { accounts } from './slices/accounts/accounts';
import { contracts } from './slices/contracts/contracts.ts';
import { idb } from './entities/idb/idb';
import { onInitApp } from './effects/onInitApp.ts';
import { networks } from './slices/networks/networks';
import { navigation } from './slices/navigation/navigation';
import { getAccessKeyList } from './effects/getAccessKeyList';

export const store = createStore({
  // entities
  idb,
  // effects
  onInitApp,
  getAccessKeyList,
  // slices
  keys,
  accounts,
  networks,
  transactions,
  calls,
  contracts,
  navigation,
});
