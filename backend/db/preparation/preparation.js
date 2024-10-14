import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import { OPFSCoopSyncVFS } from 'wa-sqlite/src/examples/OPFSCoopSyncVFS';
import { Factory } from 'wa-sqlite/src/sqlite-api';
import initDb from './preparation.sql';

export const preparation = async () => {
  const SQLiteEMSModule = await SQLiteESMFactory();
  const sqlite = Factory(SQLiteEMSModule);
  const vfs = await OPFSCoopSyncVFS.create('lantstool-vfs', SQLiteEMSModule);

  sqlite.vfs_register(vfs, true);

  return sqlite;
};

export const createDBConnection = (sqlite) => sqlite.open_v2('lantstool');

export const initDB = (sqlite, db) => sqlite.exec(db, initDb);
