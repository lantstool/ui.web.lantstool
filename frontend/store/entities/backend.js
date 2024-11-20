import { v4 as uuid } from 'uuid';
import { entity } from '@react-vault';

/* Message Types
  REQUEST
  { request { id: String, type: String, body: Object|undefined } }

  RESPONSE
  {
    response {
      id: String,
      type: String,
      status: Number,
      data: Object|undefined,
      error: Object|undefined
    }
  }
  #status: 'ok' OR 'err'
  #error - { code: Number | undefined, message: String }

  EVENT
  { event: { type: String, data: Object|undefined }
*/

class Backend {
  constructor() {
    this.worker = null;
    this.subscribers = {}; // There is only 1 subscriber for every event
    this.requests = {};
  }

  start = () => {
    this.worker = new Worker(new URL('../../../backend/worker.js', import.meta.url), {
      type: 'module',
    });
    // Handle all incoming messages from worker. We have 2 different types of them
    this.worker.addEventListener('message', (messageEvent) => {
      // console.log('Main thead receive the message:', messageEvent.data);
      const { event, response } = messageEvent.data;

      try {
        if (event) this.subscribers[event.type](event.data);
        if (response) this.requests[response.id](response);
      } catch (e) {
        console.error(e);
      }
    });
    // It doesn't matter where we will set up a 'backendReadyToWork' handler
    // because all worker messages will be handled only after 'init' func will be
    // completed - creation of a new promise is a sync operation
    return new Promise((resolve) => {
      this.subscribers['backendReadyToWork'] = () => {
        resolve();
      };
    });
  };

  // We simulate async (HTTP like) request and provide an ability to caller
  // to wait before the response on the request will be sent by worker
  sendRequest = (type, body) => {
    const id = uuid();
    this.worker.postMessage({ request: { id, type, body } });

    return new Promise((resolve, reject) => {
      this.requests[id] = (response) => {
        response.status === 'ok' ? resolve(response.data) : reject(response.error);
        delete this.requests[response.id];
      };
    });
  };

  // TODO: implement
  subscribe = () => {};
  unsubscribe = () => {};

  stop = async () => {
    await this.sendRequest('db.closeConnection');
    this.worker.terminate();
    this.worker = null;
    // TODO: think if we can have a case that we terminate the worker during
    //  it has an uncompleted requests - if so - we should handle it
    this.subscribers = {};
    this.requests = {};
  };
}

export const backend = entity(async () => {
  const backendWorker = new Backend();
  await backendWorker.start();
  return backendWorker;
});
