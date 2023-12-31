import { entity } from '../../../react-vault';
import { openDB } from 'idb/with-async-ittr';
import { v4 as uuid } from 'uuid';
import { setupUsers } from './setupUsers.ts';
import { setupSpaces } from './setupSpaces.ts';
import { setupNetworks } from './setupNetworks.ts';
import { setupTransactions } from './setupTransactions.ts';
import { setupAccounts } from './setupAccounts.ts';
import { setupEnvironments } from './setupEnvironments.ts';

// If user open the app for the first time we need to create the database
const setupIdb = async (db: any) => {
  // As we don't have a login process yet, we need to create some default data
  // const ids = {
  //   userId: uuid(),
  //   spaceId: uuid(),
  //   testnetId: uuid(),
  //   mainnetId: uuid(),
  // };

  const ids = {
    userId: 'user1',
    spaceId: 'space1',
    testnetId: 'testnet1',
    mainnetId: 'mainnet1',
  };

  await setupUsers(db, ids);
  await setupSpaces(db, ids);
  await setupNetworks(db, ids);
  await setupTransactions(db, ids);
  setupAccounts(db);
  setupEnvironments(db);
};

export const idb = entity(async () => {
  try {
    return await openDB('near-devtools', 1, {
      upgrade: async (db: any, currentVersion: number) => {
        if (currentVersion === 0) await setupIdb(db);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
