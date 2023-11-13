import { action, createStore, entity, effect } from '../react-vault/index.ts';
import { transactions } from './transactions/transactions.js';
import { vault } from './vault/index.js';
import { openDB } from 'idb';

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

  setNetwork: action(({ slice, payload }) => {
    slice.networks.active = payload;
  }),

  idb: entity(async () => {
    try {
      const idb = await openDB('near-devtools', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('transactions')) {
            db.createObjectStore('transactions', { keyPath: 'transactionId' });
          }
        },
      });
      return idb;
    } catch (e) {
      console.log(e);
    }
  }),

  transactions,
  vault,

  onInitApp: effect(async ({ store, payload }) => {
    console.log('onInitApp');
    const [_, createIdb] = store.getEntities((store) => store.idb);
    await createIdb();
    payload(false);
    // console.log(idb);
    // idb.put('transactions', { transactionId: '1', status: 'pending' });
    // setInitApp();
  }),
});
