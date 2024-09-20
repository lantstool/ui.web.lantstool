import { entity } from '../../../../react-vault/index.js';
import { openDB } from 'idb';
import { setup } from './setup/setup.js';

export const idb = entity(async () => {
  try {
    return await openDB('lantstool.io', 1, {
      upgrade: async (db, currentVersion) => {
        if (currentVersion === 0) await setup(db);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
