export const getAll = async (sqlite, db) => {
  const query = `
     SELECT * FROM spaces
    `;

  await sqlite.exec(db, query, (row, col) => {
    console.log(row);
    console.log(col);
  });
};
