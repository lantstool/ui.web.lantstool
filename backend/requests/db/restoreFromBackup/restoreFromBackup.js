import { unzipSync } from 'fflate';
import { setupDatabase } from '../../../setupDatabase/setupDatabase.js';
import { closeConnection } from '../closeConnection.js';
import { getCount } from '../../spaces/getCount.js';
import { deleteDbFiles } from '../helpers/deleteDbFiles.js';
import { renameFile } from '../helpers/renameFile.js';
import { deleteFile } from '../helpers/deleteFile.js';
import { errorWithCode } from '../../../utils/utils.js';
import { opfs } from '../../helpers/opfs.js';
import { transformUnzippedFiles } from './transformUnzippedFiles.js';

const unzipBackup = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const files = unzipSync(new Uint8Array(arrayBuffer));
    return transformUnzippedFiles(files);
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

const createContractFiles = async (contracts) =>
  Promise.all(
    contracts.map(({ name, u8File }) =>
      opfs.createFileFromU8Buffer({ buffer: u8File, name, path: 'near-protocol/contracts' }),
    ),
  );

export const restoreFromBackup = async ({ db, request }) => {
  const { backup, nearProtocol } = await unzipBackup(request.body.backup);

  await opfs.createFileFromU8Buffer({ buffer: backup.u8File, name: backup.name });
  await validateBackup(backup.name);

  await closeConnection({ db });
  await deleteDbFiles('lantstool.sqlite');
  await renameFile(backup.name, 'lantstool.sqlite');

  await setupDatabase({ db });
  await createContractFiles(nearProtocol.contracts);
};
