import { entity } from '../../../react-vault';
import { openDB } from 'idb/with-async-ittr';

// If user open the app for the first time we need to create the database
const setupIdb = (db: any) => {
  db.createObjectStore('users', { keyPath: 'userId' });

  const spaces = db.createObjectStore('spaces', { keyPath: 'spaceId' });
  spaces.createIndex('userId', 'userId');

  const networks = db.createObjectStore('networks', { keyPath: 'networkId' });
  networks.createIndex('spaceId', 'spaceId');

  const transactions = db.createObjectStore('transactions', { keyPath: 'transactionId' });
  transactions.createIndex('networkIdOrder', ['networkId', 'order'], { unique: true });

  const accounts = db.createObjectStore('accounts', { keyPath: 'accountId' });
  accounts.createIndex('networkId', 'networkId');

  const environments = db.createObjectStore('environments', { keyPath: 'environmentId' });
  environments.createIndex('networkId', 'networkId');

  db.createObjectStore('contract-codes', { keyPath: 'contractCodeId' });
};

export const idb = entity(async () => {
  try {
    return await openDB('near-devtools', 1, {
      upgrade: (db: any, currentVersion: number) => {
        if (currentVersion === 0) setupIdb(db);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
