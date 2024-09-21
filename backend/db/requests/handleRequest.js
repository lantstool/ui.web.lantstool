import { spaces } from './spaces/spaces.js';
import get from 'lodash/get';

const handlers = {
  spaces
}

export const handleRequest = async (requestType, context) => {
  const { id, type } = context.request;
  try {
    const handler = get(handlers, requestType);
    const result = await handler(context);
    self.postMessage({ response: { id, type, status: 200, data: result || null } });
  } catch (e) {
    // TODO: Add better error handling
    self.postMessage({ response: { id, type, status: 400, error: e } });
  }
};
