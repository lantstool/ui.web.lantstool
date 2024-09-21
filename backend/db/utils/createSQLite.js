import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import { OPFSCoopSyncVFS } from 'wa-sqlite/src/examples/OPFSCoopSyncVFS';
import { Factory } from 'wa-sqlite/src/sqlite-api';

export const createSQLite = async () => {
  const SQLiteEMSModule = await SQLiteESMFactory();
  const sqlite = Factory(SQLiteEMSModule);
  const vfs = await OPFSCoopSyncVFS.create('lantstool-vfs', SQLiteEMSModule);

  sqlite.vfs_register(vfs, true);

  return sqlite;
};

export const createDbConnection = (sqlite) => sqlite.open_v2('lantstool');
