import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import { OPFSCoopSyncVFS } from 'wa-sqlite/src/examples/OPFSCoopSyncVFS';
import { Factory } from 'wa-sqlite/src/sqlite-api';
import setupDatabaseSQL from './setupDatabase.sql';

const createExecuteFn = (sqlite, connection) => async (query) => {
  const result = [];

  await sqlite.exec(connection, query, (row, columns) => {
    result.push(
      columns.reduce((acc, column, index) => {
        acc[column] = row[index];
        return acc;
      }, {}),
    );
  });

  return result;
};

const getSqlite = async (dnName) => {
  const SQLiteEMSModule = await SQLiteESMFactory();
  const sqlite = Factory(SQLiteEMSModule);
  const vfs = await OPFSCoopSyncVFS.create(`${dnName}-vfs`, SQLiteEMSModule);

  sqlite.vfs_register(vfs, true);

  return sqlite;
};

export const setupDatabase = async ({ db, name = 'lantstool.sqlite' }) => {
  // Create the SQLite package
  const sqlite = await getSqlite(name);
  // Open connection
  const connection = await sqlite.open_v2(name);
  // Configure db & setup tables if needed
  await sqlite.exec(connection, setupDatabaseSQL);
  // Set fields to the global object
  db.connection = connection;
  db.sqlite = sqlite;
  db.execute = createExecuteFn(sqlite, connection);
};
