export const execute = (sqlite, db) => async (query) => {
  const result = [];

  await sqlite.exec(db, query, (row, columns) => {
    result.push(
      columns.reduce((acc, column, index) => {
        acc[column] = row[index];
        return acc;
      }, {}),
    );
  });

  return result;
};
