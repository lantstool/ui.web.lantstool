import { createSQLite, createDbConnection } from './db/utils/createSQLite.js';
import { execute } from './db/utils/execute.js';
import { handleRequest } from './db/requests/handleRequest.js';
import { createTables } from './db/tables/createTables.js';

const sqlite = await createSQLite();
const db = await createDbConnection(sqlite);

await createTables(sqlite, db);

self.addEventListener('message', async (messageEvent) => {
  console.log('Worker receive the message:', messageEvent.data);
  try {
    const { request } = messageEvent.data;

    const context = {
      request,
      execute: execute(sqlite, db),
    };

    await handleRequest(request.type, context);
  } catch (e) {
    console.error(e);
  }
});

// We need to notify main thread that worker is ready to work
self.postMessage({ event: { type: 'backendReadyToWork' } });
