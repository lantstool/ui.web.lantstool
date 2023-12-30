import { entity } from '../../../react-vault';
import { openDB } from 'idb';

const upgrade = (db: any) => {
  console.log(db);
  // if (!db.objectStoreNames.contains('transactions')) {
  //   db.createObjectStore('transactions', { keyPath: 'transactionId' });
  // }
  // if (!db.objectStoreNames.contains('vault')) {
  //   db.createObjectStore('vault', { keyPath: 'accountId' });
  // }
  // if (!db.objectStoreNames.contains('contractsCode')) {
  //   db.createObjectStore('contractsCode', { keyPath: 'contractCodeId' });
  // }
};

export const idb = entity(async () => {
  try {
    return await openDB('near-devtools', 1, {
      upgrade,
    });
  } catch (e) {
    console.log(e);
  }
});
