import { fetchJson } from '../fetchJson.js';

export const viewCode = async (contractId, rpcUrl) =>
  await fetchJson(rpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'query',
      params: {
        request_type: 'view_code',
        finality: 'final',
        account_id: contractId,
      },
    }),
  });
