import { createStore } from '../../react-vault/index.js';
import { transactions } from './slices/transactions/transactions';
import { calls } from './slices/calls/calls.js';
import { keys } from './slices/keys/keys';
import { accounts } from './slices/accounts/accounts';
import { idb } from './entities/idb_deprecated/idb';
import { backend } from './entities/backend.js';
import { initApp } from './effects/initApp.js';
import { networks } from './slices/networks/networks';
import { navigation } from './slices/navigation/navigation';
import { spaces } from './slices/spaces/spaces.js';
import { getAccessKeyList } from './effects/getAccessKeyList';

export const store = createStore({
  // entities
  idb,
  backend,
  // effects
  initApp,
  getAccessKeyList,
  // slices
  spaces,
  keys,
  accounts,
  networks,
  transactions,
  calls,
  navigation,
});
