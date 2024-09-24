import { setupSpaces } from './setupSpaces.js';
import { setupNetworks } from './setupNetworks.js';
import { setupAccounts } from './setupAccounts.js';
import { setupKeys } from './setupKeys.js';
import { setupTransactions } from './setupTransactions.js';
import { setupCalls } from './setupCalls.js';

// If user open the app for the first time we need to create the database
export const setup = async (db) => {
  await setupSpaces(db);
  await setupNetworks(db);
  setupKeys(db);
  setupAccounts(db);
  await setupTransactions(db);
  await setupCalls(db);
};
