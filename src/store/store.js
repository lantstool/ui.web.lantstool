import { createStore } from '../react-vault/index.ts';
import { transactions } from './slices/transactions/transactions';
import { vault } from './slices/vault/index';
import { keys } from './slices/keys/keys.ts';
import { accounts } from './slices/accounts/accounts';
import { idb } from './entities/idb/idb';
import { onInitApp } from './effects/onInitApp.ts';
import { networks } from './slices/networks/networks';
import { navigation } from './slices/navigation/navigation';
import { getAccessKeyList } from './effects/getAccessKeyList.ts';

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
  vault,
  navigation,
});
