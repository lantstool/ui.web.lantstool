import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import { OPFSCoopSyncVFS } from 'wa-sqlite/src/examples/OPFSCoopSyncVFS';
import { Factory } from 'wa-sqlite/src/sqlite-api';
import { deleteDbFiles } from '../requests/db/helpers/deleteDbFiles.js';
import setupDatabaseSQL from './setupDatabase.sql';
import { setupDefaultData } from './setupDefaultData.js';
import { errorWithCode } from '../utils/utils.js';
import { createExecuteFn } from './createExecuteFn.js';

const getSqlite = async (dnName) => {
  const SQLiteEMSModule = await SQLiteESMFactory();
  const sqlite = Factory(SQLiteEMSModule);
  const vfs = await OPFSCoopSyncVFS.create(`${dnName}-vfs`, SQLiteEMSModule);

  sqlite.vfs_register(vfs, true);

  return sqlite;
};

export const setupDatabase = async ({
  db,
  name = 'lantstool.sqlite',
  deleteFilesOnError = false,
}) => {
  let sqlite = null;
  let connection = null;

  try {
    // Create the SQLite package
    sqlite = await getSqlite(name);
    // Open connection
    connection = await sqlite.open_v2(name);
    // Configure db & setup tables if needed
    await sqlite.exec(connection, setupDatabaseSQL);
    // Set fields to the global object
    db.connection = connection;
    db.sqlite = sqlite;
    db.execute = createExecuteFn(sqlite, connection);
    // Setup default app settings
    await setupDefaultData(db.execute);
  } catch (e) {
    console.log(e);
    // Usually we count that only sqlite.exec can fail on this stage - for example
    // if user will try to open a connection to non-SQLite file
    if (sqlite && connection) sqlite.close(connection);
    if (deleteFilesOnError) await deleteDbFiles(name);
    errorWithCode(410, `Can't connect to the database`);
  }
};
