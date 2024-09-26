import { preparation, createDBConnection, initDB } from './db/preparation/preparation.js';
import { execute } from './db/utils/execute.js';
import { handleRequest } from './db/requests/handleRequest.js';

const sqlite = await preparation();
const db = await createDBConnection(sqlite);

const dropTable = async (table) => execute(sqlite, db)(`DROP TABLE ${table}`);
// await dropTable('spaces');
// await dropTable('near_protocol_networks');
// await dropTable('near_protocol_transactions');
// await dropTable('near_protocol_counters');
// await dropTable('near_protocol_accounts');
// await dropTable('near_protocol_keys');

await initDB(sqlite, db);

// TODO: Add a logger and embed the ability to send it to devs for users
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
    console.error('Internal Error', e);
  }
});

// We need to notify main thread that worker is ready to work
self.postMessage({ event: { type: 'backendReadyToWork' } });
