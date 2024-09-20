import { createSQLite, createDbConnection } from './db/createSQLite.js';
import { addTodo } from './db/requests/addTodo.js';

const sqlite = await createSQLite();
const db = await createDbConnection(sqlite);

self.addEventListener('message', async (event) => {
  const { request, payload } = event.data;
  if (request === 'addTodo') await addTodo(sqlite, db, payload);
});
