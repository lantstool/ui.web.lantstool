import { entity } from '../../../react-vault';
import { openDB } from 'idb/with-async-ittr';
import { setupSpaces } from './setupSpaces.ts';
import { setupNetworks } from './setupNetworks.ts';
import { setupAccounts } from './setupAccounts.ts';
import { setupKeys } from "./setupKeys.ts";
import { setupTransactions } from './setupTransactions.ts';
import { setupCalls } from "./setupCalls.ts";

// If user open the app for the first time we need to create the database
const setupIdb = async (db: any) => {
  await setupSpaces(db);
  await setupNetworks(db);
  setupKeys(db);
  setupAccounts(db);
  await setupTransactions(db);
  await setupCalls(db);
};

export const idb = entity(async () => {
  try {
    return await openDB('lantstool.io', 1, {
      upgrade: async (db: any, currentVersion: number) => {
        if (currentVersion === 0) await setupIdb(db);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
