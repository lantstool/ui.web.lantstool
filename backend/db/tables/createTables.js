const createSpaces = async (sqlite, db) => {
  const query = `
      CREATE TABLE IF NOT EXISTS spaces (
        spaceId TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        createdAt INTEGER NOT NULL,
        ownerId TEXT
      );
    `;
  await sqlite.exec(db, query);
};

export const createTables = async (sqlite, db) => {
  await Promise.all([createSpaces(sqlite, db)]);
};
