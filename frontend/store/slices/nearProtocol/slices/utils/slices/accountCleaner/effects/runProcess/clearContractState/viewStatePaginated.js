import { fetchJson } from '../../../../../../../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../../../../../../../helpers/toCamelCase.js';

export const viewStatePaginated = async ({ networkId, accountId, nextCursor = null }) => {
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

  if (jsonResponse?.result) return toCamelCase(jsonResponse.result);
  if (jsonResponse?.error) throw new Error(jsonResponse?.message);
  throw new Error(JSON.stringify(jsonResponse));
};
