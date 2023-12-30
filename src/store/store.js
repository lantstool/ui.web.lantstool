import { createStore } from '../react-vault/index.ts';
import { transactions } from './slices/transactions/transactions';
import { vault } from './slices/vault/index';
import { idb } from './entities/idb/idb';
import { onInitApp } from './effects/onInitApp.ts';

export const store = createStore({
  space: {
    spaceId: '1',
    name: 'General',
  },
  networks: {
    active: '1t',
    list: ['1t', '2m'],
    map: {
      '1t': {
        name: 'Testnet',
      },
      '2m': {
        name: 'Mainnet',
      },
    },
  },
  // entities
  idb,
  // effects
  onInitApp,
  // slices
  transactions,
  vault,
});
