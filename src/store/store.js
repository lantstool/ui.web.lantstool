import { createStore } from '../react-vault/index.ts';
import { transactions } from './slices/transactions/transactions';
import { vault } from './slices/vault/index';
import { idb } from './entities/idb/idb';
import { onInitApp } from './effects/onInitApp.ts';

export const store = createStore({
  // entities
  idb,
  // effects
  onInitApp,
  // slices
  transactions,
  vault,
});
