import { fetchJson } from '../../../../../../../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../../../../../../../helpers/toCamelCase.js';

export const viewStatePaginated = async ({ networkId, accountId, nextCursor = null }) => {
  try {
    const jsonResponse = await fetchJson(import.meta.env.VITE_STATE_PAGINATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        networkId,
        accountId,
        nextCursor,
      }),
    });

    if (jsonResponse?.error) {
      throw { message: jsonResponse.message, type: jsonResponse.error };
    }

    return toCamelCase(jsonResponse.result);
  } catch (e) {
    console.error(e);
    if (e.type) throw e;

    throw new Error(
      'Network error. The server is not responding. Please check your connection or try again later.',
    );
  }
};
