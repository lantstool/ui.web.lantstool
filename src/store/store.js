import { createStore } from '../react-vault/index.ts';
import { transactions } from './slices/transactions/transactions';
import { vault } from './slices/vault/index';
import { idb } from './entities/idb/idb';
import { onInitApp } from './effects/onInitApp.ts';
import { networks } from './slices/networks/networks';

export const store = createStore({
  // entities
  idb,
  // effects
  onInitApp,
  // slices
  networks,
  transactions,
  vault,
});
