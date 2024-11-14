import { setupDatabase } from './db/setupDatabase/setupDatabase.js';
import { handleRequest } from './db/requests/handleRequest.js';

const db = {
  sqlite: null,
  connection: null,
  execute: async () => {},
};

await setupDatabase(db);

// TODO: Add a logger and embed the ability to send it to devs for users
self.addEventListener('message', async (messageEvent) => {
  // console.log('Worker receive the message:', messageEvent.data);
  try {
    const { request } = messageEvent.data;

    const context = {
      request,
      execute: db.execute,
      db,
    };

    await handleRequest(request.type, context);
  } catch (e) {
    console.error('Internal Error', e);
  }
});

// We need to notify main thread that worker is ready to work
self.postMessage({ event: { type: 'backendReadyToWork' } });
