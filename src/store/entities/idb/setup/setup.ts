import { setupSpaces } from './setupSpaces.ts';
import { setupNetworks } from './setupNetworks.ts';
import { setupAccounts } from './setupAccounts.ts';
import { setupKeys } from './setupKeys.ts';
import { setupTransactions } from './setupTransactions.ts';
import { setupCalls } from './setupCalls.ts';

// If user open the app for the first time we need to create the database
export const setup = async (db: any) => {
  await setupSpaces(db);
  await setupNetworks(db);
  setupKeys(db);
  setupAccounts(db);
  await setupTransactions(db);
  await setupCalls(db);
};
