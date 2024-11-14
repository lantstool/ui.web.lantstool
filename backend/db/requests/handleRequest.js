import { spaces } from './spaces/index.js';
import { nearProtocol } from './nearProtocol/nearProtocol.js';
import { resetDatabase } from './resetDatabase.js';
import get from 'lodash/get';

const handlers = {
  resetDatabase,
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
        error: { code: e.code, message: e.message },
      },
    });
  }
};
