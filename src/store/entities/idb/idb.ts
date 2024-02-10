import { entity } from '../../../react-vault';
import { openDB } from 'idb/with-async-ittr';
import { setup } from "./setup/setup.ts";

export const idb = entity(async () => {
  try {
    return await openDB('lantstool.io', 1, {
      upgrade: async (db: any, currentVersion: number) => {
        if (currentVersion === 0) await setup(db);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
