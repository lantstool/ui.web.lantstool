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

const validateBackup = async (backupName) => {
  const backupDb = {};
  try {
    await setupDatabase({ db: backupDb, backupName });
    // TODO check DB version, do migration if needed
    await getCount({ execute: backupDb.execute });

    await closeConnection({ db: backupDb });
  } catch (e) {
    console.log(e);
    await deleteFile(backupName);
    errorWithCode(400, 'Invalid backup');
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
