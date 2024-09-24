import query from './tables.sql';

export const createTables = async (sqlite, db) => {
  await sqlite.exec(db, query);
};
