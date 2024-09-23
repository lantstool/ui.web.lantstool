import query from './tables.sql';
console.log(query);

export const createTables = async (sqlite, db) => {
  await sqlite.exec(db, query);
};
