import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';
import { getCount } from '../spaces/getCount.js';
import { deleteDbFiles } from './helpers/deleteDbFiles.js';
import { renameFile } from './helpers/renameFile.js';
import { createFile } from './helpers/createFile.js';

const validateBackup = async (backupName) => {
  const backupDb = {};
  try {
    await setupDatabase({ db: backupDb, backupName });
    // TODO check DB version, do migration if needed
    const res = await getCount({ execute: backupDb.execute });
    console.log('Validation success', res);
    await closeConnection({ db: backupDb });
  } catch (e) {
    console.log(e);
  }
};

export const restoreFromBackup = async ({ db, request }) => {
  const backupName = request.body.backup.name;

  await createFile(request.body.backup);
  await validateBackup(backupName);

  await closeConnection({ db });
  await deleteDbFiles('lantstool.sqlite');
  await renameFile(backupName, 'lantstool.sqlite');
  await setupDatabase({ db });
};
