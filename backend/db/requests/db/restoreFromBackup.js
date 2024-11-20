import { unzipSync } from 'fflate';
import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';
import { getCount } from '../spaces/getCount.js';
import { deleteDbFiles } from './helpers/deleteDbFiles.js';
import { renameFile } from './helpers/renameFile.js';
import { createFileFromU8Buffer } from './helpers/createFileFromU8Buffer.js';
import { deleteFile } from './helpers/deleteFile.js';
import { errorWithCode } from '../../../utils/utils.js';

const unzipBackup = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const files = unzipSync(new Uint8Array(arrayBuffer));
    return Object.entries(files)[0];
  } catch (e) {
    console.log(e);
    errorWithCode(400, 'Cannot unzip the backup');
  }
};

// TODO check DB version, do migration if needed
const validateDb = async (backupDb, backupName) => {
  try {
    await getCount({ execute: backupDb.execute });
  } catch (e) {
    await closeConnection({ db: backupDb });
    await deleteDbFiles(backupName);
    errorWithCode(420, 'Incompatible SQLite database');
  }
};

const validateBackup = async (backupName) => {
  const backupDb = {};
  try {
    await setupDatabase({ db: backupDb, name: backupName, deleteFilesOnError: true });
    // Perform DB checks
    await validateDb(backupDb, backupName);
    // If all good and DB valid, delete all other DB files and close connection
    await closeConnection({ db: backupDb });
    await deleteFile(`${backupName}-wal`);
    await deleteFile(`${backupName}-journal`);
  } catch (e) {
    console.log(e);
    // If DB is a real SQLite DB but is an incompatible - just end up with error
    if (e.code === 420) throw e;
    // In other cases just throw the default error
    errorWithCode(400, 'Incompatible backup file');
  }
};

export const restoreFromBackup = async ({ db, request }) => {
  const [backupName, u8Buffer] = await unzipBackup(request.body.backup);
  await createFileFromU8Buffer(u8Buffer, backupName);
  await validateBackup(backupName);

  await closeConnection({ db });
  await deleteDbFiles('lantstool.sqlite');
  await renameFile(backupName, 'lantstool.sqlite');
  await setupDatabase({ db });
};
