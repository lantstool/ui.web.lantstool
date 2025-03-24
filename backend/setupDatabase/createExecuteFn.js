import { SQLITE_OK, SQLITE_ROW } from 'wa-sqlite/src/sqlite-constants.js';

const execute = async ({ sqlite, connection, query, params, callback }) => {
  for await (const stmt of sqlite.statements(connection, query)) {
    let columns;

    if (params) sqlite.bind_collection(stmt, params);

    while ((await sqlite.step(stmt)) === SQLITE_ROW) {
      if (callback) {
        columns = columns ?? sqlite.column_names(stmt);
        const row = sqlite.row(stmt);
        await callback(row, columns);
      }
    }
  }
  return SQLITE_OK;
};

export const createExecuteFn = (sqlite, connection) => async (query, params) => {
  const result = [];

  const callback = (row, columns) => {
    result.push(
      columns.reduce((acc, column, index) => {
        acc[column] = row[index];
        return acc;
      }, {}),
    );
  };

  await execute({ sqlite, connection, query, params, callback });

  return result;
};
