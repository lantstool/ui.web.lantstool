import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';

export const createBackup = async ({ db }) => {
  await closeConnection({ db });
  // get
  // "VACUUM INTO 'backup.sqlite';"
  await setupDatabase(db);

  const query = `
    VACUUM INTO 'backup.sqlite';
  `;
  return await db.execute(query);
};
