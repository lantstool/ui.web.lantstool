import { createStore } from '../../react-vault/index.js';
import { initApp } from './effects/initApp.js';
import { getAccessKeyList } from './effects/getAccessKeyList';
import { transactions } from './slices/transactions/transactions';
import { calls } from './slices/calls/calls.js';
import { keys } from './slices/keys/keys';
import { accounts } from './slices/accounts/accounts';
import { idb } from './entities/idb_deprecated/idb';
import { backend } from './entities/backend.js';
import { navigation } from './slices/navigation/navigation';
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  // entities
  idb,
  backend,
  // effects
  initApp,
  getAccessKeyList,
  // slices
  spaces,
  nearProtocol,
  keys,
  accounts,
  transactions,
  calls,
  navigation,
});
