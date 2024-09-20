export const create = async (sqlite, db) => {
  const query = `
      INSERT INTO spaces (spaceId, name, type, createdAt, ownerId)
      VALUES('s2', 'Personal', 'local', 12345, 'a1');
    `;

  await sqlite.exec(db, query, (row, col) => {
    console.log('create callback ');
    console.log(row);
    console.log(col);
  });
};
