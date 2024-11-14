import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';

const deleteDbFiles = async () => {
  try {
    const name = 'lantstool.sqlite';
    const dir = await navigator.storage.getDirectory();
    // Looks like the wa-sqlite delete temporary folders '.ahp-' automatically
    // so we don't need to do it manually
    await Promise.all([
      dir.removeEntry(name),
      dir.removeEntry(`${name}-wal`),
      dir.removeEntry(`${name}-journal`),
    ]);
  } catch (e) {
    return new Error(`Error during a DB files deletion: ${e}`);
  }
};

export const reset = async ({ db }) => {
  // Close DB connection - can't delete the file when it has an open connections
  await closeConnection({ db });
  // Delete DB
  await deleteDbFiles();
  // Create a new DB + open a connection + rewrite to global object
  await setupDatabase(db);
};
