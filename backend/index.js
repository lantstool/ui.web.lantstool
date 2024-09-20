import { createSQLite, createDbConnection } from './db/init/createSQLite.js';
import { createTables } from './db/init/createTables.js';
import { spaces } from './db/requests/spaces/spaces.js';

const sqlite = await createSQLite();
const db = await createDbConnection(sqlite);

await createTables(sqlite, db);

self.addEventListener('message', async (event) => {
  const { request, payload } = event.data;
  console.log('Worker request: ', event.data);

  if (request === 'spaces.getAll') await spaces.getAll(sqlite, db, payload);
  if (request === 'spaces.create') await spaces.create(sqlite, db, payload);
});

// Add callback INIT to be sure that worker started and ready to use

self.postMessage({ request: 'start.ready' });
