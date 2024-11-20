import { db } from './db/db.js';
import { spaces } from './spaces/index.js';
import { nearProtocol } from './nearProtocol/nearProtocol.js';
import get from 'lodash/get';

const handlers = {
  db,
  spaces,
  nearProtocol,
};

export const handleRequest = async (requestType, context) => {
  const { id, type } = context.request;
  try {
    const handler = get(handlers, requestType);

    if (!handler) throw new Error(`Handler for '${requestType}' is not registered`);

    const result = await handler(context);
    const data = result === undefined || result === null ? null : result;

    self.postMessage({ response: { id, type, status: 'ok', data } });
  } catch (e) {
    self.postMessage({
      response: {
        id,
        type,
        status: 'err',
        error: { code: e.code || 500, message: e.message },
      },
    });
  }
};
