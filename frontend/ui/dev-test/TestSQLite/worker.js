import { createSQLite, createDbConnection  } from './db/createSQLite.js';

const sqlite = await createSQLite();
const db = await createDbConnection(sqlite);

self.addEventListener('message', async (event) => {
  const { type, payload } = event.data;

  // if (type === 'addTodo') await addTodo(sqlite, db, payload);



  if (type === 'getTodos') {
    const query = `SELECT * FROM todos`;

    const list = [];

    await sqlite.exec(db, query, (row, columns) => {
      list.push(
        columns.reduce((acc, column, index) => {
          acc[column] = row[index];
          return acc;
        }, {}),
      );
    });

    console.log(list);
  }

  if (type === 'createTable') {
    const query = `
      CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        completed BOOLEAN
      );
    `;
    await sqlite.exec(db, query);
    console.log("Table 'todos' created.");
  }

  if (type === 'deleteTodosTable') {
    const query = `
     DROP TABLE todos
    `;
    const res = await sqlite.exec(db, query);
    console.log("Table 'todos' deleted", res);
  }
});




/*

 */
