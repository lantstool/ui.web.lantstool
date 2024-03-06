import { fetchJson } from '../fetchJson.ts';

export const viewAccount = async (accountId: string, rpcUrl: string) =>
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
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      },
    }),
  });
