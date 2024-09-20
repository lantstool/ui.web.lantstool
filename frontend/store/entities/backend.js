import { v4 as uuid } from 'uuid';
import { entity } from '../../../react-vault/index.js';

class Backend {
  constructor() {
    this.worker = null;
    this.messageHandlers = [];
  }

  init() {
    this.worker = new Worker(new URL('./backend/index.js', window.location.origin), {
      type: 'module',
    });

    return new Promise((resolve, reject) => {
      this.worker.addEventListener('message', (event) => {
        if (event.data.request === 'start.ready') {
          resolve();
        }

        if (event.data.request === 'start.error') {
          reject(event.data.error);
        }

        this.messageHandlers.forEach((fn) => fn(event));
      });
    });
  }

  sendRequest(request, payload) {
    const id = uuid();
    this.worker.postMessage({ id, request, payload });
  }
}

export const backend = entity(async () => {
  const back = new Backend();
  await back.init();
  return back;
});
